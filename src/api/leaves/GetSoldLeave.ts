import { SoldLeave } from "@/types/leave";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";

export default class GetSoldLeave
  extends SecureUseCase
  implements UseCase<void, Promise<SoldLeave>>
{
  async execute(): Promise<SoldLeave> {
    const url = new URL(
      `Leave/Employee/Sold`,
      process.env.NEXT_PUBLIC_BACKEND_URL
    );

    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });

    return await response.json();
  }
}
