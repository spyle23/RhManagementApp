import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";

export default class DeleteUser
  extends SecureUseCase
  implements UseCase<number, Promise<string>>
{
  async execute(id: number): Promise<string> {
    const url = new URL(`User/${id}`, process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetchWithAuth(url, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        errorMessage ||
          "Une erreur s'est produite lors de la suppréssion de l'utilisateur"
      );
    }

    return await response.text();
  }
}
