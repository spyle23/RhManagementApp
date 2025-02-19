"use client";

import { useForm, Controller } from "react-hook-form";
import {
  PlusIcon,
  XMarkIcon,
  TrashIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { FC, useEffect, useMemo, useState } from "react";
import {
  CreateEmployeeRecordDto,
  EmployeeRecordDto,
} from "@/types/employeeRecord";
import { UserHeader } from "@/types/user";
import { UserSelect } from "@/components/UserSelect";
import { Dropzone } from "@/components/dropzone/Dropzone";

type EmployeeRecordFormProps = {
  onClose: () => void;
  onSubmit: (
    data: CreateEmployeeRecordDto & { file: File | null }
  ) => Promise<void>;
  employee?: EmployeeRecordDto;
  employees: UserHeader[];
};

const FilePreview = ({
  fileName,
  onRemove,
}: {
  fileName: string;
  onRemove: () => void;
}) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center">
        <DocumentIcon className="h-5 w-5 text-gray-500 mr-2" />
        <span className="text-sm text-gray-700">{fileName}</span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-gray-400 hover:text-gray-500"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export const EmployeeRecordForm: FC<EmployeeRecordFormProps> = ({
  onClose,
  onSubmit,
  employee,
  employees,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<CreateEmployeeRecordDto>();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [defaultUrl, setDefaultUrl] = useState<string | null>(null);

  useEffect(() => {
    if (employee) {
      const val = employee.birthday
        ? new Date(employee.birthday)
            .toLocaleDateString(["fr"], {
              dateStyle: "short",
            })
            .split("/")
        : ([] as string[]);
      reset({
        ...employee,
        birthday: val.length > 0 ? `${val[2]}-${val[1]}-${val[0]}` : undefined,
      });
      const url = new URL(employee.cv, process.env.NEXT_PUBLIC_IMAGE_URI);
      setDefaultUrl(url.toString());
    }
  }, [employee, reset]);

  const handleSelect = (employee?: UserHeader) => {
    setValue("employeeId", employee?.id);
  };

  const selectedUser = useMemo(() => {
    const employeeId = watch().employeeId;
    if (employeeId) {
      return employees.find((a) => a.id === employeeId);
    }
    return undefined;
  }, [employees, watch().employeeId]);

  const handleAction = async (data: CreateEmployeeRecordDto) => {
    try {
      setLoading(true);
      await onSubmit({ ...data, file });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadFile = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDefaultUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold">
            {employee ? "Modifier" : "Ajouter"} une fiche employée
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleAction)} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <input
                  {...register("telephone", { required: "Téléphone requis" })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.telephone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.telephone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Adresse
                </label>
                <input
                  {...register("adresse", { required: "Adresse requise" })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.adresse && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.adresse.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date de naissance
                </label>
                <input
                  type="date"
                  {...register("birthday", {
                    required: "Date de naissance requise",
                  })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.birthday && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.birthday.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Poste
                </label>
                <input
                  {...register("poste", { required: "Poste requis" })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.poste && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.poste.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profil
                </label>
                <input
                  {...register("profil", { required: "Profil requis" })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.profil && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.profil.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salaire brut
                </label>
                <input
                  type="number"
                  {...register("grossSalary", {
                    required: "Salaire brut requis",
                  })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.grossSalary && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.grossSalary.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Full Width Elements */}
          <Controller
            name="employeeId"
            control={control}
            rules={{ required: "Vous devez choisir un employé" }}
            render={({ field }) => (
              <div>
                <UserSelect
                  users={employees}
                  disabled={employee ? true : false}
                  placeholder="Choisir un employé"
                  selectedUser={selectedUser}
                  onSelect={(user) => {
                    field.onChange(user?.id);
                    handleSelect(user);
                  }}
                />
                {errors.employeeId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.employeeId.message}
                  </p>
                )}
              </div>
            )}
          />

          <div>
            {defaultUrl ? (
              <FilePreview
                fileName={file?.name || "cv"}
                onRemove={() => {
                  setFile(null);
                  setDefaultUrl(null);
                }}
              />
            ) : (
              <Dropzone onFinished={handleUploadFile} type="application/pdf" />
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 ${
                loading
                  ? "bg-gray-200 text-black"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }  rounded-md `}
            >
              {loading ? "Chargement..." : employee ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
