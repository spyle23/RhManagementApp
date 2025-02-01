import { LeaveForm, LeaveResult, SoldLeave } from "@/types/leave";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";

export default class DeleteLeave
  extends SecureUseCase
  implements UseCase<number, Promise<{ message: string }>>
{
  async execute(id: number): Promise<{ message: string }> {
    const url = new URL(`Leave/${id}`, process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetch(url, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });

    return await response.json();
  }
}
