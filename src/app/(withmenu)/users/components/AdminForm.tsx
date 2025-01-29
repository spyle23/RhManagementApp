import { ICreateUser } from "@/types/user";
import { useFormContext } from "react-hook-form";

export const AdminForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ICreateUser>();
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
};
