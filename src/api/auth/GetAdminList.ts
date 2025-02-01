import { UserHeader } from "@/types/user";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";

export default class GetAdminList
  extends SecureUseCase
  implements UseCase<void, Promise<UserHeader[]>>
{
  async execute(): Promise<UserHeader[]> {
    const url = new URL(`User/Admin/List`, process.env.NEXT_PUBLIC_BACKEND_URL);

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
