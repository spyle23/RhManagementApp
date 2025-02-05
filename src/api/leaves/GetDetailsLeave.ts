import { LeaveDetails, LeaveResult } from "@/types/leave";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default class GetDetailsLeave
  extends SecureUseCase
  implements UseCase<number, Promise<LeaveDetails>>
{
  async execute(id: number): Promise<LeaveDetails> {
    const url = new URL(
      `Leave/${id}`,
      process.env.NEXT_PUBLIC_BACKEND_URL
    );

    const response = await fetchWithAuth(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });

    return await response.json();
  }
} 