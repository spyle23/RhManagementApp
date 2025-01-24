import { ICreateUser, UserHeader, UserRoles } from "@/types/user";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";

export default class CreateUser
  extends SecureUseCase
  implements UseCase<FormData, Promise<UserRoles>>
{
  async execute(data: FormData): Promise<UserRoles> {
    const url = new URL(`User`, process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetch(url, {
      method: "post",
      body: data,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
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
