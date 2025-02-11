"use client";

import { useForm, Controller } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CreateTeam from "@/api/team/CreateTeam";
import { useApplication } from "@/store/useApplication";
import { useEffect, useMemo, useState } from "react";
import { TeamWithManagerDetails } from "@/types/team";
import { UserHeader } from "@/types/user";
import { UserSelect } from "@/components/UserSelect";

type CreateTeamModalProps = {
  onClose: () => void;
  onProceed: (data: CreateTeamForm) => void;
  currTeam?: TeamWithManagerDetails;
  managers: UserHeader[];
};

type CreateTeamForm = {
  name: string;
  specialty: string;
  managerId?: number;
};

export function CreateTeamModal({
  onClose,
  onProceed,
  currTeam,
  managers,
}: CreateTeamModalProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateTeamForm>({
    defaultValues: { name: "", specialty: "", managerId: 0 },
  });

  const onSubmit = async (data: CreateTeamForm) => {
    try {
      await onProceed(data);
    } catch (error) {
      console.error("Failed to create team:", error);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (currTeam) {
      reset({
        managerId: currTeam.managerId,
        name: currTeam.name,
        specialty: currTeam.specialty,
      });
    }
  }, [currTeam]);

  const handleSelect = (manager?: UserHeader) => {
    setValue("managerId", manager?.id);
  };

  const selectedUser = useMemo(() => {
    const managerId = watch().managerId;
    if (managerId) {
      return managers.find((a) => a.id === managerId);
    }
    return undefined;
  }, [managers, watch().managerId]);

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {currTeam ? "Modifier l'équipe" : "Créer une nouvelle équipe"}
          </h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Le nom de l'équipe est requis" }}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'équipe
                </label>
                <input
                  {...field}
                  type="text"
                  className={`w-full border rounded-md p-2 ${
                    errors.name
                      ? "border-red-600 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="specialty"
            control={control}
            rules={{ required: "La spécialité est requise" }}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spécialité
                </label>
                <input
                  {...field}
                  type="text"
                  className={`w-full border rounded-md p-2 ${
                    errors.specialty
                      ? "border-red-600 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.specialty && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.specialty.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="managerId"
            control={control}
            rules={{ required: "Le manager est requis" }}
            render={({ field }) => (
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manager
                </label> */}
                <UserSelect
                  users={managers}
                  placeholder="Choisir un manager"
                  selectedUser={selectedUser}
                  onSelect={(user) => {
                    field.onChange(user?.id);
                    handleSelect(user);
                  }}
                />
                {errors.managerId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.managerId.message}
                  </p>
                )}
              </div>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 disabled:bg-gray-300"
          >
            {isSubmitting
              ? "chargement..."
              : currTeam
              ? "Modifier les infos"
              : "Créer l'équipe"}
          </button>
        </form>
      </div>
    </div>
  );
}
