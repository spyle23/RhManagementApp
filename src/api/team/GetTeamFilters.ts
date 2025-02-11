import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { BasePagination } from "@/types/BasePagination";
import { TeamFilters } from "@/types/query";
import { Team, TeamWithManagerDetails } from "@/types/team";

export default class GetTeamFilters
  extends SecureUseCase
  implements UseCase<TeamFilters, Promise<BasePagination<TeamWithManagerDetails>>>
{
  async execute(filters: TeamFilters): Promise<BasePagination<TeamWithManagerDetails>> {
    const url = new URL("Team", process.env.NEXT_PUBLIC_BACKEND_URL);

    url.searchParams.append("pageNumber", filters.pageNumber.toString());
    url.searchParams.append("pageSize", filters.pageSize.toString());

    if (filters.searchTerm) {
      url.searchParams.append("searchTerm", filters.searchTerm);
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