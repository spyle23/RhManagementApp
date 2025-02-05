import { IActionLeave, LeaveForm, LeaveResult, SoldLeave } from "@/types/leave";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default class ValidateAdminLeave
  extends SecureUseCase
  implements UseCase<IActionLeave, Promise<LeaveResult>>
{
  async execute(data: IActionLeave): Promise<LeaveResult> {
    const url = new URL(
      `Leave/${data.id}/validate/Admin`,
      process.env.NEXT_PUBLIC_BACKEND_URL
    );

    const { status } = data;

    const response = await fetchWithAuth(url, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ status }),
    });

    return await response.json();
  }
}
