import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { LeaveResult, LeaveStatus } from "@/types/leave";

export default class ValidateRhLeave
  extends SecureUseCase
  implements UseCase<{ id: number; status: LeaveStatus }, Promise<LeaveResult>>
{
  async execute({
    id,
    status,
  }: {
    id: number;
    status: LeaveStatus;
  }): Promise<LeaveResult> {
    const url = new URL(
      `Leave/${id}/Validate`,
      process.env.NEXT_PUBLIC_BACKEND_URL
    );

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