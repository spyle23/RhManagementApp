import { BasePagination } from "@/types/BasePagination";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { PayslipFilters } from "@/types/query";
import { PayslipResult } from "@/types/payslip";

export default class GetMyPayslipHistory
  extends SecureUseCase
  implements UseCase<PayslipFilters, Promise<BasePagination<PayslipResult>>>
{
  async execute(filters: PayslipFilters): Promise<BasePagination<PayslipResult>> {
    const url = new URL("Payslip", process.env.NEXT_PUBLIC_BACKEND_URL);

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