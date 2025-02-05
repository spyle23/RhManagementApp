import { LeaveFilters } from "@/types/query";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { BasePagination } from "@/types/BasePagination";
import { LeaveResult } from "@/types/leave";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default class GetLeaveByAdminFilters
  extends SecureUseCase
  implements UseCase<LeaveFilters, Promise<BasePagination<LeaveResult>>>
{
  async execute(
    userFilters: LeaveFilters
  ): Promise<BasePagination<LeaveResult>> {
    const url = new URL(`Leave/Admin`, process.env.NEXT_PUBLIC_BACKEND_URL);

    url.searchParams.append("pageNumber", userFilters.pageNumber.toString());
    url.searchParams.append("pageSize", userFilters.pageSize.toString());

    if (userFilters.searchTerm) {
      url.searchParams.append("searchTerm", userFilters.searchTerm);
    }

    if (userFilters.status) {
      url.searchParams.append("status", userFilters.status);
    }

    if (userFilters.type) {
      url.searchParams.append("type", userFilters.type);
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