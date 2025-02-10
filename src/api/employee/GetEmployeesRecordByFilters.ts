import { EmployeeRecordFilters } from "@/types/query";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { BasePagination } from "@/types/BasePagination";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { EmployeeRecordDto } from "@/types/employeeRecord";

export default class GetEmployeesRecordByFilters
  extends SecureUseCase
  implements UseCase<EmployeeRecordFilters, Promise<BasePagination<EmployeeRecordDto>>>
{
  async execute(
    filters: EmployeeRecordFilters
  ): Promise<BasePagination<EmployeeRecordDto>> {
    const url = new URL(`EmployeeRecord`, process.env.NEXT_PUBLIC_BACKEND_URL);

    url.searchParams.append("pageNumber", filters.pageNumber.toString());
    url.searchParams.append("pageSize", filters.pageSize.toString());

    if (filters.searchTerm) {
      url.searchParams.append("searchTerm", filters.searchTerm);
    }

    if (filters.status) {
      url.searchParams.append("status", filters.status);
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