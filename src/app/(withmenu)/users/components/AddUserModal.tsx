import CreateUser from "@/api/auth/CreateUser";
import UpdateUser from "@/api/auth/UpdateUser";
import { Dropzone } from "@/components/dropzone/Dropzone";
import { roles } from "@/constants/roles";
import { useApplication } from "@/store/useApplication";
import { ICreateUser, Role, UserRoles } from "@/types/user";
import { TrashIcon } from "@heroicons/react/24/outline";
import { cp } from "fs";
import { FC, useEffect, useMemo, useState } from "react";
import {
  useForm,
  Controller,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import { AdminForm } from "./AdminForm";
import { EmployeeBasedForm } from "./EmployeeBasedForm";

type AddUserModalProps = {
  onCreateUser: (val: UserRoles) => void;
  onClose: () => void;
  user?: ICreateUser;
};

export const BaseUserForm: FC<{
  role: "Admin" | "Autres";
  currUser?: ICreateUser;
}> = ({ role, currUser }) => {
  return role === "Admin" ? (
    <AdminForm />
  ) : (
    <EmployeeBasedForm
      roles={["Manager", "RH", "Employee"]}
      currUser={currUser}
    />
  );
};

export const AddUserModal: FC<AddUserModalProps> = ({
  onClose,
  onCreateUser,
  user: currUser,
}) => {
  const methods = useForm<ICreateUser>();
  const { user } = useApplication();
  const {
    register,
    watch,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
    handleSubmit,
  } = methods;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [selectedTab, setSelectedTab] = useState<"Admin" | "Autres">("Autres");

  useEffect(() => {
    if (currUser) {
      const val = currUser.dateOfHiring
        ? new Date(currUser.dateOfHiring)
            .toLocaleDateString(["fr"], {
              dateStyle: "short",
            })
            .split("/")
        : ([] as string[]);
      reset({
        ...currUser,
        role: currUser.role,
        dateOfHiring:
          val.length > 0 ? `${val[2]}-${val[1]}-${val[0]}` : undefined,
      });
    }
  }, [currUser]);

  const handleUploadFile = (file: File[]) => {
    setValue("file", file[0]);
  };

  const handleRemoveFile = () => {
    const vals = getValues();
    if (vals.picture) {
      setValue("picture", undefined);
    }
    setValue("file", undefined);
  };

  const submitData = async (val: ICreateUser) => {
    try {
      if (user) {
        setLoading(true);
        const formData = new FormData();
        const createUser = new CreateUser(user.token);
        const updateUser = new UpdateUser(user.token);
        Object.keys(val).forEach((k) =>
          val[k] ? formData.append(k, val[k]) : undefined
        );
        const createdUser = currUser
          ? await updateUser.execute({ data: formData, id: currUser.id! })
          : await createUser.execute(formData);
        onCreateUser(
          currUser ? { ...createdUser, role: currUser.role } : createdUser
        );
        onClose();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const defaultImageUrl = watch().file
    ? URL.createObjectURL(watch().file as File)
    : watch().picture
    ? process.env.NEXT_PUBLIC_IMAGE_URI + watch().picture
    : null;

  useEffect(() => {
    if (!currUser) {
      setValue("role", selectedTab === "Admin" ? "Admin" : ("" as Role));
    }
  }, [selectedTab, currUser]);

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
      <div
        style={{ maxHeight: 650 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 overflow-y-scroll"
      >
        <h2 className="text-xl font-semibold mb-4">
          {currUser
            ? `Informations de ${currUser.firstName} ${currUser.lastName}`
            : "Nouvel Utilisateur"}
        </h2>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Prénom
            </label>
            <input
              type="text"
              placeholder="Prénom"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.lastName
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("lastName", {
                required: { value: true, message: "Prénom requis" },
              })}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nom de famille
            </label>
            <input
              type="text"
              placeholder="Nom de famille"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("firstName", {
                required: { value: true, message: "Nom de famille requis" },
              })}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Cin
            </label>
            <input
              type="number"
              placeholder="117 123 2563 147"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.cin
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("cin", {
                required: { value: true, message: "cin requis" },
              })}
            />
            {errors.cin && (
              <p className="mt-1 text-sm text-red-600">{errors.cin.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="test@yopmail.com"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("email", {
                required: { value: true, message: "email requis" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Adresse email invalide",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          {!currUser && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="Az12@*4s1ex"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                {...register("password", {
                  required: { value: true, message: "mot de passe requis" },
                  minLength: 8,
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}
          <div className="mb-4 w-full">
            {defaultImageUrl ? (
              <div className="flex justify-center w-full relative">
                <img src={defaultImageUrl} className="h-24" />
                <TrashIcon
                  onClick={handleRemoveFile}
                  className="h-5 w-5 absolute top-0 right-0 text-red-600 cursor-pointer"
                />
              </div>
            ) : (
              <Dropzone onFinished={handleUploadFile} type="image/*" />
            )}
          </div>
          <div className="flex mb-4 border-b w-full justify-between">
            <button
              type="button"
              onClick={() => !currUser && setSelectedTab("Admin")}
              className={`px-4 py-2 ${
                selectedTab === "Admin"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500"
              } ${currUser ? "cursor-not-allowed opacity-50" : ""}`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => !currUser && setSelectedTab("Autres")}
              className={`px-4 py-2 ${
                selectedTab === "Autres"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500"
              } ${currUser ? "cursor-not-allowed opacity-50" : ""}`}
            >
              Autres
            </button>
          </div>
          <FormProvider {...methods}>
            <BaseUserForm role={selectedTab} currUser={currUser} />
          </FormProvider>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || Boolean(error)}
              className={`px-4 py-2 ${
                loading || Boolean(error)
                  ? "bg-gray-200 text-black"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }  rounded-md `}
            >
              {loading ? "Chargement..." : currUser ? "Modifier" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
