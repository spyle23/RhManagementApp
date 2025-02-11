import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { BasePagination } from "@/types/BasePagination";
import { LeaveResult } from "@/types/leave";
import { LeaveFilters } from "@/types/query";

export default class GetEmployeeLeavesForRh
  extends SecureUseCase
  implements UseCase<LeaveFilters, Promise<BasePagination<LeaveResult>>>
{
  async execute(filters: LeaveFilters): Promise<BasePagination<LeaveResult>> {
    const url = new URL("Leave/employee-leaves", process.env.NEXT_PUBLIC_BACKEND_URL);

    url.searchParams.append("pageNumber", filters.pageNumber.toString());
    url.searchParams.append("pageSize", filters.pageSize.toString());

    if (filters.status) {
      url.searchParams.append("status", filters.status);
    }

    if (filters.type) {
      url.searchParams.append("type", filters.type);
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