import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SupplierProfileInput } from "@/types/supplier";
import {
  SUPPLIER_PROFILES_STORAGE_KEY,
  __clearStoreForTests,
  getActiveProfile,
  getActiveProfileId,
  getProfile,
  listProfiles,
  removeProfile,
  saveProfile,
  setActiveProfile,
} from "@/lib/storage/supplier-profiles";

const validInput: SupplierProfileInput = {
  label: "Test FOP",
  nameEn: "Test Supplier LLC",
  nameUa: "Тестовий постачальник",
  addressEn: "1 Test Street, Kyiv",
  addressUa: "вул. Тестова, 1, Київ",
  taxId: "0000000000",
  bankName: "Test Bank",
  swift: "TESTUA2X",
  ibanUsd: "UA000000000000000000000000000",
  ibanEur: "UA111111111111111111111111111",
};

function createStorageMock() {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
  } satisfies Storage;
}

describe("supplier-profiles storage", () => {
  let storage: Storage;

  beforeEach(() => {
    storage = createStorageMock();
    vi.stubGlobal("window", { localStorage: storage });
    vi.stubGlobal("localStorage", storage);
    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => "profile-uuid-1"),
    });
    __clearStoreForTests();
  });

  afterEach(() => {
    __clearStoreForTests();
    vi.unstubAllGlobals();
  });

  it("starts empty", () => {
    expect(listProfiles()).toEqual([]);
    expect(getActiveProfile()).toBeNull();
  });

  it("saves a new profile and lists it", () => {
    const saved = saveProfile(validInput);

    expect(saved.id).toBe("profile-uuid-1");
    expect(saved.nameEn).toBe(validInput.nameEn);
    expect(listProfiles()).toHaveLength(1);
    expect(getProfile(saved.id)?.ibanEur).toBe(validInput.ibanEur);
  });

  it("sets first saved profile as active automatically", () => {
    const saved = saveProfile(validInput);

    expect(getActiveProfileId()).toBe(saved.id);
    expect(getActiveProfile()?.id).toBe(saved.id);
  });

  it("edits an existing profile", () => {
    const saved = saveProfile(validInput);
    vi.mocked(crypto.randomUUID).mockReturnValueOnce("profile-uuid-2");

    const updated = saveProfile({
      ...validInput,
      id: saved.id,
      nameEn: "Updated Supplier LLC",
      bankName: "Updated Bank",
    });

    expect(updated.id).toBe(saved.id);
    expect(updated.nameEn).toBe("Updated Supplier LLC");
    expect(updated.bankName).toBe("Updated Bank");
    expect(listProfiles()).toHaveLength(1);
  });

  it("switches active profile", () => {
    const first = saveProfile(validInput);
    vi.mocked(crypto.randomUUID).mockReturnValueOnce("profile-uuid-2");
    const second = saveProfile({ ...validInput, label: "Second", nameEn: "Second LLC" });

    setActiveProfile(second.id);

    expect(getActiveProfileId()).toBe(second.id);
    expect(getActiveProfile()?.nameEn).toBe("Second LLC");
    expect(getProfile(first.id)?.nameEn).toBe(validInput.nameEn);
  });

  it("deletes a non-active profile", () => {
    const first = saveProfile(validInput);
    vi.mocked(crypto.randomUUID).mockReturnValueOnce("profile-uuid-2");
    const second = saveProfile({ ...validInput, label: "Second", nameEn: "Second LLC" });

    setActiveProfile(first.id);
    removeProfile(second.id);

    expect(listProfiles()).toHaveLength(1);
    expect(getActiveProfileId()).toBe(first.id);
  });

  it("reassigns active pointer when active profile is deleted", () => {
    const first = saveProfile(validInput);
    vi.mocked(crypto.randomUUID).mockReturnValueOnce("profile-uuid-2");
    const second = saveProfile({ ...validInput, label: "Second", nameEn: "Second LLC" });

    setActiveProfile(first.id);
    removeProfile(first.id);

    expect(listProfiles()).toHaveLength(1);
    expect(getActiveProfileId()).toBe(second.id);
  });

  it("clears active pointer when last profile is deleted", () => {
    const saved = saveProfile(validInput);
    removeProfile(saved.id);

    expect(listProfiles()).toEqual([]);
    expect(getActiveProfileId()).toBeNull();
    expect(getActiveProfile()).toBeNull();
  });

  it("persists across reload simulation via storage mock", () => {
    const saved = saveProfile(validInput);
    setActiveProfile(saved.id);

    const raw = storage.getItem(SUPPLIER_PROFILES_STORAGE_KEY);
    expect(raw).toBeTruthy();

    __clearStoreForTests();
    expect(listProfiles()).toEqual([]);

    storage.setItem(SUPPLIER_PROFILES_STORAGE_KEY, raw!);

    expect(listProfiles()).toHaveLength(1);
    expect(getActiveProfile()?.id).toBe(saved.id);
    expect(getProfile(saved.id)?.swift).toBe(validInput.swift);
  });

  it("rejects save when required fields are empty", () => {
    expect(() =>
      saveProfile({ ...validInput, taxId: "   " })
    ).toThrow(/ІПН/);
  });
});
