import { LeaveForm, LeaveResult, SoldLeave } from "@/types/leave";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default class CreateLeave
  extends SecureUseCase
  implements UseCase<LeaveForm, Promise<LeaveResult>>
{
  async execute(data: LeaveForm): Promise<LeaveResult> {
    const url = new URL(`Leave`, process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetchWithAuth(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        errorMessage ||
          "Une erreur s'est produite lors de la création de l'utilisateur"
      );
    }

    return await response.json();
  }
}
