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

/** Reference-stable empty list shared by the server snapshot and empty stores. */
const EMPTY_PROFILES: SupplierProfile[] = [];
Object.freeze(EMPTY_PROFILES);

const PROFILE_STRING_FIELDS = [
  "id",
  "label",
  "nameEn",
  "nameUa",
  "addressEn",
  "addressUa",
  "taxId",
  "bankName",
  "swift",
  "ibanUsd",
  "ibanEur",
  "createdAt",
  "updatedAt",
] as const;

const IBAN_WHITESPACE_PATTERN = /\s+/g;
const MIN_IBAN_LENGTH = 15;
const MAX_IBAN_LENGTH = 34;

export class SupplierProfileStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupplierProfileStorageError";
  }
}

type SupplierProfilesListener = () => void;

const listeners = new Set<SupplierProfilesListener>();

/** Memoized snapshot for useSyncExternalStore; invalidated on every write. */
let cachedProfiles: SupplierProfile[] | null = null;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function notifyListeners(): void {
  for (const listener of listeners) {
    listener();
  }
}

function handleStorageEvent(event: StorageEvent): void {
  // key === null means the whole storage was cleared.
  if (event.key !== null && event.key !== SUPPLIER_PROFILES_STORAGE_KEY) {
    return;
  }
  cachedProfiles = null;
  notifyListeners();
}

/**
 * Subscribe to supplier-profile store changes (same-tab writes and
 * cross-tab storage events). Returns an unsubscribe function.
 */
export function subscribeSupplierProfiles(
  listener: SupplierProfilesListener
): () => void {
  if (isBrowser() && listeners.size === 0) {
    window.addEventListener("storage", handleStorageEvent);
  }
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (isBrowser() && listeners.size === 0) {
      window.removeEventListener("storage", handleStorageEvent);
    }
  };
}

function isSupplierProfileRecord(value: unknown): value is SupplierProfile {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return PROFILE_STRING_FIELDS.every(
    (field) => typeof record[field] === "string"
  );
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

    const parsed = JSON.parse(raw) as Record<string, unknown> | null;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      parsed.version !== 1 ||
      !Array.isArray(parsed.profiles)
    ) {
      return { ...EMPTY_STORE, profiles: [] };
    }

    // Drop corrupt records instead of letting them reach render.
    const profiles = parsed.profiles.filter(isSupplierProfileRecord);
    const rawActiveId = parsed.activeProfileId;
    const activeProfileId =
      typeof rawActiveId === "string" &&
      profiles.some((profile) => profile.id === rawActiveId)
        ? rawActiveId
        : null;

    return { version: 1, activeProfileId, profiles };
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

/** Persist the store, then invalidate the snapshot and notify subscribers. */
function commitStore(store: SupplierProfilesStore): void {
  writeStore(store);
  cachedProfiles = null;
  notifyListeners();
}

function normalizeIban(value: string): string {
  return value.replace(IBAN_WHITESPACE_PATTERN, "").toUpperCase();
}

function trimFields(input: SupplierProfileInput): SupplierProfileInput {
  return {
    label: input.label.trim(),
    nameEn: input.nameEn.trim(),
    nameUa: input.nameUa.trim(),
    addressEn: input.addressEn.trim(),
    addressUa: input.addressUa.trim(),
    taxId: input.taxId.trim(),
    bankName: input.bankName.trim(),
    swift: input.swift.trim().toUpperCase(),
    ibanUsd: normalizeIban(input.ibanUsd),
    ibanEur: normalizeIban(input.ibanEur),
  };
}

function isNonEmpty(value: string): boolean {
  return value.length > 0;
}

function isPlausibleIban(value: string): boolean {
  const normalized = normalizeIban(value);
  return (
    normalized.length >= MIN_IBAN_LENGTH &&
    normalized.length <= MAX_IBAN_LENGTH
  );
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

/**
 * Reference-stable snapshot of stored profiles. Safe to pass to
 * useSyncExternalStore as getSnapshot; the reference only changes
 * after a write (or a cross-tab storage event).
 */
export function listProfiles(): SupplierProfile[] {
  if (!isBrowser()) {
    return EMPTY_PROFILES;
  }

  if (cachedProfiles === null) {
    const { profiles } = readStore();
    cachedProfiles = profiles.length === 0 ? EMPTY_PROFILES : profiles;
  }

  return cachedProfiles;
}

/** Server snapshot for useSyncExternalStore: always the frozen empty list. */
export function getServerProfilesSnapshot(): SupplierProfile[] {
  return EMPTY_PROFILES;
}

/** Server snapshot for useSyncExternalStore: no active profile on the server. */
export function getServerActiveProfileId(): string | null {
  return null;
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

  commitStore({ ...store, activeProfileId: id });
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
    commitStore({ ...store, profiles });
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
  // Only the first-ever profile is auto-activated; activation is
  // otherwise an explicit user action (setActiveProfile).
  const activeProfileId =
    store.activeProfileId ?? (profiles.length === 1 ? created.id : null);

  commitStore({ ...store, profiles, activeProfileId });
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

  commitStore({ ...store, profiles, activeProfileId });
}

/** Test helper: seed the raw storage value and reset the cached snapshot. */
export function __seedRawStoreForTests(raw: string): void {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(SUPPLIER_PROFILES_STORAGE_KEY, raw);
  cachedProfiles = null;
}

/** Test helper: clear storage key and reset the cached snapshot. */
export function __clearStoreForTests(): void {
  cachedProfiles = null;
  if (!isBrowser()) {
    return;
  }
  window.localStorage.removeItem(SUPPLIER_PROFILES_STORAGE_KEY);
}
