import { UserRoles } from "@/types/user";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { UserFilters } from "@/types/query";
import { BasePagination } from "@/types/BasePagination";

export default class GetUsersByFilters
  extends SecureUseCase
  implements UseCase<UserFilters, Promise<BasePagination<UserRoles>>>
{
  async execute(userFilters: UserFilters): Promise<BasePagination<UserRoles>> {
    const url = new URL(`User`, process.env.NEXT_PUBLIC_BACKEND_URL);

    url.searchParams.append("pageNumber", userFilters.pageNumber.toString());
    url.searchParams.append("pageSize", userFilters.pageSize.toString());

    if (userFilters.role) {
      url.searchParams.append("role", userFilters.role);
    }
    if (userFilters.searchTerm) {
      url.searchParams.append("searchTerm", userFilters.searchTerm);
    }

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
