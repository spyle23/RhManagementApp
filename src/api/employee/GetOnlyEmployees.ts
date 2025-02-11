import { UserHeader } from "@/types/user";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default class GetOnlyEmployees
  extends SecureUseCase
  implements UseCase<{ search?: string }, Promise<UserHeader[]>>
{
  async execute(filters: { search?: string }): Promise<UserHeader[]> {
    const url = new URL(
      `User/OnlyEmployees`,
      process.env.NEXT_PUBLIC_BACKEND_URL
    );

    if (filters.search) {
      url.searchParams.append("searchTerm", filters.search);
    }

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
