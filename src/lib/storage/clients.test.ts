import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ClientInput } from "@/types/client";
import {
  ClientValidationError,
  clientToInvoiceCustomerFields,
  deleteClient,
  getClient,
  listClients,
  saveClient,
} from "@/lib/storage/clients";

function createLocalStorageMock() {
  const store = new Map<string, string>();

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
  };
}

function buildClientInput(overrides: Partial<ClientInput> = {}): ClientInput {
  return {
    name: "Acme Corp",
    address: "вул. Хрещатик, 1, Київ",
    email: "billing@acme.example",
    phone: "+380501112233",
    website: "https://acme.example",
    ...overrides,
  };
}

describe("clients storage", () => {
  let idCounter = 0;

  beforeEach(() => {
    idCounter = 0;
    const storage = createLocalStorageMock();

    vi.stubGlobal("window", { localStorage: storage });
    vi.stubGlobal("crypto", {
      randomUUID: () => `client-test-id-${++idCounter}`,
    });
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-10T10:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("creates, reads, updates, and deletes clients", () => {
    const created = saveClient(buildClientInput());
    expect(created.id).toBe("client-test-id-1");
    expect(getClient(created.id)).toEqual(created);

    vi.setSystemTime(new Date("2026-07-10T11:00:00.000Z"));
    const updated = saveClient({
      ...created,
      name: "Acme Updated",
      phone: "+380509998877",
    });
    expect(updated.name).toBe("Acme Updated");
    expect(updated.createdAt).toBe(created.createdAt);
    expect(updated.updatedAt).not.toBe(created.updatedAt);

    expect(deleteClient(created.id)).toBe(true);
    expect(getClient(created.id)).toBeNull();
    expect(deleteClient(created.id)).toBe(false);
  });

  it("lists clients sorted by updatedAt descending", () => {
    const older = saveClient(
      buildClientInput({
        name: "Older Client",
        email: "older@example.com",
      })
    );

    vi.setSystemTime(new Date("2026-07-10T12:00:00.000Z"));
    const newer = saveClient(
      buildClientInput({
        name: "Newer Client",
        email: "newer@example.com",
      })
    );

    expect(listClients().map((client) => client.id)).toEqual([
      newer.id,
      older.id,
    ]);
  });

  it("rejects saves without required fields", () => {
    expect(() => saveClient(buildClientInput({ name: "   " }))).toThrow(
      ClientValidationError
    );
    expect(() => saveClient(buildClientInput({ address: "" }))).toThrow(
      ClientValidationError
    );
    expect(() => saveClient(buildClientInput({ email: " " }))).toThrow(
      ClientValidationError
    );
  });

  it("maps client fields to invoice customer placeholders", () => {
    const client = saveClient(
      buildClientInput({
        name: "Олена Коваль",
        company: "Acme LLC",
      })
    );

    expect(clientToInvoiceCustomerFields(client)).toEqual({
      customerName: "Олена Коваль (Acme LLC)",
      customerAddress1: client.address,
      customerEmail: client.email,
      customerPhone: client.phone,
      customerWebsite: client.website,
    });
  });
});
