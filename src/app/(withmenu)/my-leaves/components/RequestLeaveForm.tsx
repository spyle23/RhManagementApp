"use client";

import GetAdminList from "@/api/auth/GetAdminList";
import { useApplication } from "@/store/useApplication";
import { LeaveForm, LeaveResult, LeaveType } from "@/types/leave";
import { UserHeader } from "@/types/user";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FC, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type RequestLeaveFormProps = {
  currLeave?: LeaveResult;
  onClose: () => void;
  onSubmit: (data: LeaveForm) => Promise<void>;
};
export const RequestLeaveForm: FC<RequestLeaveFormProps> = ({
  onClose,
  currLeave,
  onSubmit,
}) => {
  const leavesTypes: LeaveType[] = [LeaveType.holiday, LeaveType.permission];
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
    reset,
  } = useForm<LeaveForm>();

  const { user } = useApplication();
  const [admins, setAdmins] = useState<UserHeader[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAdmin = async () => {
      if (!currLeave && user?.token) {
        const getAdminList = new GetAdminList(user.token);
        const vals = await getAdminList.execute();
        setAdmins(vals);
      }
    };

    const setDefaultValue = () => {
      if (currLeave) {
        const [startDay, startMonth, startYear] = new Date(currLeave.startDate)
          .toLocaleDateString(["fr"], { dateStyle: "short" })
          .split("/");
        const [endDay, endMonth, endYear] = new Date(currLeave.endDate)
          .toLocaleDateString(["fr"], { dateStyle: "short" })
          .split("/");

        reset({
          ...currLeave,
          startDate: `${startYear}-${startMonth}-${startDay}`,
          endDate: `${endYear}-${endMonth}-${endDay}`,
        });
      }
    };

    getAdmin();
    setDefaultValue();
  }, [currLeave, user]);

  console.log("forms", watch());

  const onValid = async (value: LeaveForm) => {
    try {
      setLoading(true);
      await onSubmit(value);
    } catch (error) {
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const startGtEnd = useMemo(() => {
    const endDateString = watch().endDate;
    const startDateString = watch().startDate;
    if (endDateString && startDateString) {
      return new Date(startDateString) > new Date(endDateString);
    }
    return false;
  }, [watch().startDate, watch().endDate]);

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
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold">
            {currLeave ? "Modification de la" : "Nouvelle"} Demande de Congé
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onValid)} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de congé
            </label>
            <Controller
              name="type"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Le type de congé est requis",
                },
              }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full rounded-md border-2 border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-1"
                >
                  <option value="">Choisir le type de congé</option>
                  {leavesTypes.map((a, i) => (
                    <option key={i} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de début
              </label>
              <input
                type="date"
                {...register("startDate", {
                  required: {
                    value: true,
                    message: "Veuillez renseigner la date de départ",
                  },
                })}
                className="w-full rounded-md border-2 border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-1"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de fin
              </label>
              <input
                type="date"
                {...register("endDate", {
                  required: {
                    value: true,
                    message: "Veuillez rensegner la date de retour",
                  },
                })}
                className="w-full rounded-md border-2 border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-1"
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>
          {startGtEnd && (
            <p className="mt-1 text-sm text-red-600">
              La date de départ ne peut pas être supérieure au date de retour
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motif
            </label>
            <textarea
              {...register("reason", {
                required: {
                  value: true,
                  message: "Veuillez préciser le motif",
                },
              })}
              rows={3}
              className="w-full rounded-md border-2 border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-1"
              placeholder="Précisez le motif de votre demande..."
            />
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">
                {errors.reason.message}
              </p>
            )}
          </div>

          {!currLeave && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                le responsable
              </label>
              <Controller
                name="adminId"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Le responsable est requis",
                  },
                }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full rounded-md border-2 border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-1"
                  >
                    <option value="">Choisir le responsable</option>
                    {admins.map((a, i) => (
                      <option key={i} value={a.id}>
                        {a.firstName} {a.lastName}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.adminId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.adminId.message}
                </p>
              )}
            </div>
          )}

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
              disabled={loading || startGtEnd}
              className={`px-4 py-2 ${
                loading || startGtEnd
                  ? "bg-gray-200 text-black"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }  rounded-md `}
            >
              {loading
                ? "chargement..."
                : currLeave
                ? "Valider la modification"
                : "Soumettre la demande"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
