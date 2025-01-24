import { UserRoles } from "@/types/user";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";

type IUpdateUser = {
  data: FormData;
  id: number;
};

export default class UpdateUser
  extends SecureUseCase
  implements UseCase<IUpdateUser, Promise<UserRoles>>
{
  async execute({ data, id }: IUpdateUser): Promise<UserRoles> {
    const url = new URL(
      `User/Update/${id}`,
      process.env.NEXT_PUBLIC_BACKEND_URL
    );

    const response = await fetch(url, {
      method: "put",
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
