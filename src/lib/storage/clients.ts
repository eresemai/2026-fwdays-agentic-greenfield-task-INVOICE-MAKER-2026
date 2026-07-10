import type {
  Client,
  ClientInput,
  InvoiceCustomerFields,
} from "@/types/client";

const STORAGE_KEY = "invoice-maker:clients:v1";

type ClientsStore = {
  version: 1;
  clients: Client[];
};

type Listener = () => void;

const listeners = new Set<Listener>();

function notifyListeners(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeClients(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export class ClientValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClientValidationError";
  }
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readStore(): ClientsStore {
  if (!isBrowser()) {
    return { version: 1, clients: [] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { version: 1, clients: [] };
    }

    const parsed = JSON.parse(raw) as ClientsStore;
    if (parsed.version !== 1 || !Array.isArray(parsed.clients)) {
      return { version: 1, clients: [] };
    }

    return parsed;
  } catch {
    return { version: 1, clients: [] };
  }
}

function writeStore(store: ClientsStore): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Ignore quota errors and private browsing restrictions.
  }
}

function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeOptional(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function validateClientInput(input: ClientInput): ClientInput {
  const name = input.name.trim();
  const address = input.address.trim();
  const email = input.email.trim();

  if (!name) {
    throw new ClientValidationError("Client name is required.");
  }

  if (!address) {
    throw new ClientValidationError("Client address is required.");
  }

  if (!email) {
    throw new ClientValidationError("Client email is required.");
  }

  return {
    ...input,
    name,
    address,
    email,
    phone: input.phone.trim(),
    website: input.website.trim(),
    company: normalizeOptional(input.company),
    taxId: normalizeOptional(input.taxId),
  };
}

function sortClients(clients: Client[]): Client[] {
  return [...clients].sort(
    (left, right) =>
      Date.parse(right.updatedAt) - Date.parse(left.updatedAt)
  );
}

export function listClients(): Client[] {
  return sortClients(readStore().clients);
}

export function getClient(id: string): Client | null {
  return readStore().clients.find((client) => client.id === id) ?? null;
}

export function saveClient(input: ClientInput): Client {
  const validated = validateClientInput(input);
  const store = readStore();
  const now = new Date().toISOString();
  const existingIndex = validated.id
    ? store.clients.findIndex((client) => client.id === validated.id)
    : -1;

  if (existingIndex >= 0) {
    const existing = store.clients[existingIndex];
    const updated: Client = {
      ...existing,
      ...validated,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: now,
    };
    store.clients[existingIndex] = updated;
    writeStore(store);
    notifyListeners();
    return updated;
  }

  const created: Client = {
    ...validated,
    id: validated.id ?? createId(),
    createdAt: now,
    updatedAt: now,
  };
  store.clients.push(created);
  writeStore(store);
  notifyListeners();
  return created;
}

export function deleteClient(id: string): boolean {
  const store = readStore();
  const nextClients = store.clients.filter((client) => client.id !== id);

  if (nextClients.length === store.clients.length) {
    return false;
  }

  writeStore({ version: 1, clients: nextClients });
  notifyListeners();
  return true;
}

export function clientToInvoiceCustomerFields(
  client: Client
): InvoiceCustomerFields {
  return {
    customerName: client.company
      ? `${client.name} (${client.company})`
      : client.name,
    customerAddress1: client.address,
    customerEmail: client.email,
    customerPhone: client.phone,
    customerWebsite: client.website,
  };
}
