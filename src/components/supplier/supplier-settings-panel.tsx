"use client";

import { useCallback, useEffect, useState } from "react";
import { SupplierProfileDropdown } from "@/components/supplier/supplier-profile-dropdown";
import { SupplierProfileForm } from "@/components/supplier/supplier-profile-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SupplierProfileStorageError,
  getActiveProfileId,
  listProfiles,
  removeProfile,
  saveProfile,
  setActiveProfile,
} from "@/lib/storage/supplier-profiles";
import type { SupplierProfileFormValues } from "@/components/supplier/supplier-profile-form";
import type { SupplierProfile } from "@/types/supplier";

type PanelMode = "create" | "edit";

export function SupplierSettingsPanel() {
  const [profiles, setProfiles] = useState<SupplierProfile[]>(() => listProfiles());
  const [activeId, setActiveId] = useState<string | null>(() => getActiveProfileId());
  const [mode, setMode] = useState<PanelMode>("create");
  const [editingProfile, setEditingProfile] = useState<SupplierProfile | null>(
    null
  );
  const [storageError, setStorageError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    const nextProfiles = listProfiles();
    const nextActiveId = getActiveProfileId();
    setProfiles(nextProfiles);
    setActiveId(nextActiveId);

    if (mode === "edit" && editingProfile) {
      const stillExists = nextProfiles.find(
        (profile) => profile.id === editingProfile.id
      );
      setEditingProfile(stillExists ?? null);
      if (!stillExists) {
        setMode("create");
      }
    }
  }, [editingProfile, mode]);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === null || event.key.includes("supplier-profiles")) {
        refresh();
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refresh]);

  function handleStorageFailure(error: unknown) {
    if (error instanceof SupplierProfileStorageError) {
      setStorageError(error.message);
      return;
    }
    setStorageError("Не вдалося виконати дію. Спробуйте ще раз.");
  }

  function handleSelectProfile(profileId: string) {
    try {
      setActiveProfile(profileId);
      setActiveId(profileId);
      setStorageError(null);
      const profile = listProfiles().find((item) => item.id === profileId) ?? null;
      setEditingProfile(profile);
      setMode(profile ? "edit" : "create");
    } catch (error) {
      handleStorageFailure(error);
    }
  }

  function handleCreateClick() {
    setMode("create");
    setEditingProfile(null);
    setStorageError(null);
  }

  function handleSave(values: SupplierProfileFormValues) {
    try {
      const saved = saveProfile(
        mode === "edit" && editingProfile
          ? { ...values, id: editingProfile.id }
          : values
      );
      setActiveProfile(saved.id);
      refresh();
      setMode("edit");
      setEditingProfile(saved);
      setStorageError(null);
    } catch (error) {
      handleStorageFailure(error);
    }
  }

  function handleDelete() {
    if (!editingProfile) {
      return;
    }

    try {
      removeProfile(editingProfile.id);
      setMode("create");
      setEditingProfile(null);
      refresh();
      setStorageError(null);
    } catch (error) {
      handleStorageFailure(error);
    }
  }

  const activeProfile =
    profiles.find((profile) => profile.id === activeId) ?? null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SupplierProfileDropdown
          profiles={profiles}
          activeId={activeId}
          onSelect={handleSelectProfile}
        />
        <Button className="h-9 shrink-0" onClick={handleCreateClick}>
          Додати профіль
        </Button>
      </div>

      {storageError ? (
        <p className="text-sm text-destructive" role="alert">
          {storageError}
        </p>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "edit" && editingProfile
              ? `Редагування: ${editingProfile.label}`
              : "Новий профіль постачальника"}
          </CardTitle>
          <CardDescription>
            {activeProfile && mode === "edit"
              ? "Активний профіль використовуватиметься для нових рахунків."
              : "Усі поля обовʼязкові. Дані зберігаються лише в цьому браузері."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SupplierProfileForm
            key={editingProfile?.id ?? "create"}
            profile={mode === "edit" ? editingProfile : null}
            onSubmit={handleSave}
            onCancel={
              mode === "edit"
                ? () => {
                    setMode("create");
                    setEditingProfile(null);
                  }
                : undefined
            }
          />

          {mode === "edit" && editingProfile ? (
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button type="button" variant="outline" className="text-destructive">
                    Видалити профіль
                  </Button>
                }
              />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Видалити профіль?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Профіль «{editingProfile.label}» буде видалено з браузера.
                    Цю дію не можна скасувати.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Скасувати</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    Видалити
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
