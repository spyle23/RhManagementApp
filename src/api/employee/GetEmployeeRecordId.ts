import { EmployeeRecordDto } from "@/types/employeeRecord";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default class GetEmployeeRecordId
  extends SecureUseCase
  implements UseCase<number, Promise<EmployeeRecordDto>>
{
  async execute(id: number): Promise<EmployeeRecordDto> {
    const url = new URL(`EmployeeRecord/${id}`, process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetchWithAuth(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to fetch employee record");
    }

    return await response.json();
  }
} 