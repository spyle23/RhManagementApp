import { ILogin, User } from "@/types/user";
import UseCase from "../interfaces/UseCase";

export default class LoginUser implements UseCase<ILogin, Promise<User>> {
  async execute(input: ILogin): Promise<User> {
    const url = new URL("Auth/login", process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  }
}
