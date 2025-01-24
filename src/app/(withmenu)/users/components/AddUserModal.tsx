import CreateUser from "@/api/auth/CreateUser";
import { Dropzone } from "@/components/dropzone/Dropzone";
import { roles } from "@/constants/roles";
import { useApplication } from "@/store/useApplication";
import { ICreateUser, Role, UserRoles } from "@/types/user";
import { TrashIcon } from "@heroicons/react/24/outline";
import { cp } from "fs";
import { FC, useMemo, useState } from "react";
import {
  useForm,
  Controller,
  useFormContext,
  FormProvider,
} from "react-hook-form";

type AddUserModalProps = {
  onCreateUser: (val: UserRoles) => void;
  onClose: () => void;
};

const BaseUserForm: FC<{ role: Role }> = ({ role }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ICreateUser>();
  switch (role) {
    case "Admin":
      return (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Département
            </label>
            <input
              type="text"
              placeholder="Entrez le département"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${
                errors.depatment
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("depatment", {
                required: { value: true, message: "Département requis" },
              })}
            />
            {errors.depatment && (
              <p className="mt-1 text-sm text-red-600">
                {errors.depatment.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Niveau d'accès
            </label>
            <input
              type="text"
              placeholder="Entrez le niveau d'accès"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.accessLevel
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("accessLevel", {
                required: { value: true, message: "Niveau d'accès requis" },
              })}
            />
            {errors.accessLevel && (
              <p className="mt-1 text-sm text-red-600">
                {errors.accessLevel.message}
              </p>
            )}
          </div>
        </div>
      );
    case "Manager":
      return (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Niveau de management
            </label>
            <input
              type="text"
              placeholder="Entrez le niveau de management"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2  ${
                errors.managementLevel
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("managementLevel", {
                required: {
                  value: true,
                  message: "Niveau de management requis",
                },
              })}
            />
            {errors.managementLevel && (
              <p className="mt-1 text-sm text-red-600">
                {errors.managementLevel.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Années d'expériences
            </label>
            <input
              type="number"
              placeholder="Entrez le nombre d'années d'expérience"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2  ${
                errors.yearsOfExperience
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500 "
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              } `}
              {...register("yearsOfExperience", {
                required: {
                  value: true,
                  message: "années d'expériences requis",
                },
              })}
            />
            {errors.yearsOfExperience && (
              <p className="mt-1 text-sm text-red-600">
                {errors.yearsOfExperience.message}
              </p>
            )}
          </div>
        </div>
      );
    case "RH":
      return (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Spécialisation
            </label>
            <input
              type="text"
              placeholder="Entrez votre spécialisation"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${
                errors.specialisation
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("specialisation", {
                required: { value: true, message: "Spécialisation requise" },
              })}
            />
            {errors.specialisation && (
              <p className="mt-1 text-sm text-red-600">
                {errors.specialisation.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Certification
            </label>
            <input
              type="text"
              placeholder="Entrez votre certification"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.certification
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("certification", {
                required: { value: true, message: "Certification requise" },
              })}
            />
            {errors.certification && (
              <p className="mt-1 text-sm text-red-600">
                {errors.certification.message}
              </p>
            )}
          </div>
        </div>
      );
    default:
      return (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Recruté le
            </label>
            <input
              type="date"
              placeholder="Sélectionnez la date de recrutement"
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.dateOfHiring
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("dateOfHiring", {
                required: {
                  value: true,
                  message: "La date de recrutement est requise",
                },
              })}
            />
            {errors.dateOfHiring && (
              <p className="mt-1 text-sm text-red-600">
                {errors.dateOfHiring.message}
              </p>
            )}
          </div>
        </div>
      );
  }
};

export const AddUserModal: FC<AddUserModalProps> = ({
  onClose,
  onCreateUser,
}) => {
  const methods = useForm<ICreateUser>();
  const { user } = useApplication();
  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = methods;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleUploadFile = (file: File[]) => {
    setValue("file", file[0]);
  };

  const handleRemoveFile = () => {
    setValue("file", undefined);
  };

  const submitData = async (val: ICreateUser) => {
    try {
      if (user) {
        setLoading(true);
        const formData = new FormData();
        const createUser = new CreateUser(user.token);
        Object.keys(val).forEach((k) => formData.append(k, val[k]));
        console.log("formData", formData);
        const createdUser = await createUser.execute(formData);
        console.log("createdUser", createUser);
        onCreateUser(createdUser);
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
    : null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 h-full overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4">Nouvel Utilisateur</h2>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rôle
            </label>
            <Controller
              name="role"
              control={control}
              rules={{
                required: { value: true, message: "le rôle est requis" },
              }}
              render={({ field }) => (
                <select
                  {...field}
                  className={`mt-1 block px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    errors.role
                      ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                >
                  <option value="">Choisir le rôle</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>
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
          {watch().role && (
            <FormProvider {...methods}>
              <BaseUserForm role={watch().role} />
            </FormProvider>
          )}

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
              {loading ? "Chargement..." : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
