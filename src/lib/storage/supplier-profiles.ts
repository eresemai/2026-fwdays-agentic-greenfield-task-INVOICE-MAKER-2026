import type { SupplierProfile, SupplierProfileInput } from "@/types/supplier";

export const SUPPLIER_PROFILES_STORAGE_KEY =
  "invoice-maker:supplier-profiles:v1";

type SupplierProfilesStore = {
  version: 1;
  activeProfileId: string | null;
  profiles: SupplierProfile[];
};

const EMPTY_STORE: SupplierProfilesStore = {
  version: 1,
  activeProfileId: null,
  profiles: [],
};

export class SupplierProfileStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupplierProfileStorageError";
  }
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readStore(): SupplierProfilesStore {
  if (!isBrowser()) {
    return { ...EMPTY_STORE, profiles: [] };
  }

  try {
    const raw = window.localStorage.getItem(SUPPLIER_PROFILES_STORAGE_KEY);
    if (!raw) {
      return { ...EMPTY_STORE, profiles: [] };
    }

    const parsed = JSON.parse(raw) as SupplierProfilesStore;
    if (parsed.version !== 1 || !Array.isArray(parsed.profiles)) {
      return { ...EMPTY_STORE, profiles: [] };
    }

    return {
      version: 1,
      activeProfileId: parsed.activeProfileId ?? null,
      profiles: parsed.profiles,
    };
  } catch {
    return { ...EMPTY_STORE, profiles: [] };
  }
}

function writeStore(store: SupplierProfilesStore): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(
      SUPPLIER_PROFILES_STORAGE_KEY,
      JSON.stringify(store)
    );
  } catch {
    throw new SupplierProfileStorageError(
      "Не вдалося зберегти профіль. Перевірте налаштування браузера."
    );
  }
}

function trimFields(
  input: SupplierProfileInput
): SupplierProfileInput {
  return {
    label: input.label.trim(),
    nameEn: input.nameEn.trim(),
    nameUa: input.nameUa.trim(),
    addressEn: input.addressEn.trim(),
    addressUa: input.addressUa.trim(),
    taxId: input.taxId.trim(),
    bankName: input.bankName.trim(),
    swift: input.swift.trim(),
    ibanUsd: input.ibanUsd.trim().toUpperCase(),
    ibanEur: input.ibanEur.trim().toUpperCase(),
  };
}

function isNonEmpty(value: string): boolean {
  return value.length > 0;
}

function isPlausibleIban(value: string): boolean {
  const normalized = value.replace(/\s/g, "").toUpperCase();
  return normalized.length >= 15 && normalized.length <= 34;
}

export function validateSupplierProfileInput(
  input: SupplierProfileInput
): string | null {
  const fields = trimFields(input);

  if (!isNonEmpty(fields.nameEn)) return "Вкажіть назву англійською.";
  if (!isNonEmpty(fields.nameUa)) return "Вкажіть назву українською.";
  if (!isNonEmpty(fields.addressEn)) return "Вкажіть адресу англійською.";
  if (!isNonEmpty(fields.addressUa)) return "Вкажіть адресу українською.";
  if (!isNonEmpty(fields.taxId)) return "Вкажіть ІПН.";
  if (!isNonEmpty(fields.bankName)) return "Вкажіть назву банку.";
  if (!isNonEmpty(fields.swift)) return "Вкажіть SWIFT/BIC.";
  if (!isPlausibleIban(fields.ibanUsd)) return "Некоректний IBAN (USD).";
  if (!isPlausibleIban(fields.ibanEur)) return "Некоректний IBAN (EUR).";

  return null;
}

function resolveLabel(input: SupplierProfileInput): string {
  return input.label.trim() || input.nameEn.trim();
}

export function listProfiles(): SupplierProfile[] {
  return readStore().profiles;
}

export function getProfile(id: string): SupplierProfile | null {
  return readStore().profiles.find((profile) => profile.id === id) ?? null;
}

export function getActiveProfile(): SupplierProfile | null {
  const store = readStore();
  if (!store.activeProfileId) {
    return null;
  }
  return getProfile(store.activeProfileId);
}

export function getActiveProfileId(): string | null {
  return readStore().activeProfileId;
}

export function setActiveProfile(id: string): void {
  const store = readStore();
  if (!store.profiles.some((profile) => profile.id === id)) {
    throw new SupplierProfileStorageError("Профіль не знайдено.");
  }

  writeStore({ ...store, activeProfileId: id });
}

export function saveProfile(
  input: SupplierProfileInput & { id?: string }
): SupplierProfile {
  const trimmed = trimFields(input);
  const validationError = validateSupplierProfileInput(trimmed);
  if (validationError) {
    throw new SupplierProfileStorageError(validationError);
  }

  const label = resolveLabel(trimmed);
  const now = new Date().toISOString();
  const store = readStore();

  if (input.id) {
    const index = store.profiles.findIndex((profile) => profile.id === input.id);
    if (index === -1) {
      throw new SupplierProfileStorageError("Профіль не знайдено.");
    }

    const existing = store.profiles[index];
    const updated: SupplierProfile = {
      ...existing,
      ...trimmed,
      label,
      updatedAt: now,
    };
    const profiles = [...store.profiles];
    profiles[index] = updated;
    writeStore({ ...store, profiles });
    return updated;
  }

  const created: SupplierProfile = {
    id: crypto.randomUUID(),
    ...trimmed,
    label,
    createdAt: now,
    updatedAt: now,
  };

  const profiles = [...store.profiles, created];
  const activeProfileId =
    store.activeProfileId ?? (profiles.length === 1 ? created.id : null);

  writeStore({ ...store, profiles, activeProfileId });
  return created;
}

export function removeProfile(id: string): void {
  const store = readStore();
  const profiles = store.profiles.filter((profile) => profile.id !== id);

  if (profiles.length === store.profiles.length) {
    throw new SupplierProfileStorageError("Профіль не знайдено.");
  }

  let activeProfileId = store.activeProfileId;
  if (activeProfileId === id) {
    activeProfileId = profiles[0]?.id ?? null;
  }

  writeStore({ ...store, profiles, activeProfileId });
}

/** Test helper: replace entire store contents. */
export function __replaceStoreForTests(store: SupplierProfilesStore): void {
  writeStore(store);
}

/** Test helper: clear storage key. */
export function __clearStoreForTests(): void {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.removeItem(SUPPLIER_PROFILES_STORAGE_KEY);
}
