import { ICreateUser, UserRoles } from "@/types/user";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type EmployeeBasedFormProps = {
  roles: string[];
  currUser?: ICreateUser;
};

export const EmployeeBasedForm: FC<EmployeeBasedFormProps> = ({
  roles,
  currUser,
}) => {
  const {
    register,
    formState: { errors },
    control,
    watch,
  } = useFormContext<ICreateUser>();
  const generateFormByRole = () => {
    if (watch().role === "Manager") {
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
    } else if (watch().role === "RH") {
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
                errors.specialization
                  ? "border-red-600 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              {...register("specialization", {
                required: { value: true, message: "Spécialisation requise" },
              })}
            />
            {errors.specialization && (
              <p className="mt-1 text-sm text-red-600">
                {errors.specialization.message}
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
    } else {
      return null;
    }
  };
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Rôle</label>
        <Controller
          name="role"
          control={control}
          rules={{
            required: { value: true, message: "le rôle est requis" },
          }}
          render={({ field }) => (
            <select
              {...field}
              disabled={Boolean(currUser)}
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
      {generateFormByRole()}
    </div>
  );
};
