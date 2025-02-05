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

    return await response.json();
  }
}
