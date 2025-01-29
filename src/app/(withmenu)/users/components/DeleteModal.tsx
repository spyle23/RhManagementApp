import { FC, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { UserRoles } from "@/types/user";
import DeleteUser from "@/api/auth/DeleteUser";
import { useApplication } from "@/store/useApplication";

type DeleteModalProps = {
  onClose: () => void;
  onDelete: (user: UserRoles) => void;
  user: UserRoles;
};

export const DeleteModal: FC<DeleteModalProps> = ({
  onClose,
  onDelete,
  user,
}) => {
  const { user: currentUser } = useApplication();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleDelete = async () => {
    try {
      if (currentUser) {
        setLoading(true);
        const deleteUser = new DeleteUser(currentUser.token);
        await deleteUser.execute(user.id);
        onDelete(user);
        onClose();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Supprimer l'utilisateur
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Êtes-vous sûr de vouloir supprimer l'utilisateur {user.firstName}{" "}
            {user.lastName} ? Cette action est irréversible.
          </p>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className={`px-4 py-2 ${
              loading ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
            } text-white rounded-md  text-sm font-medium`}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};
