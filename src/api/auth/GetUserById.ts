import { UserHeader } from "@/types/user";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default class GetUserById
  extends SecureUseCase
  implements UseCase<number, Promise<UserHeader>>
{
  async execute(userId: number): Promise<UserHeader> {
    const url = new URL(`User/${userId}`, process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetchWithAuth(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${this.token}`
      },
    });

    return await response.json();
  }
}
