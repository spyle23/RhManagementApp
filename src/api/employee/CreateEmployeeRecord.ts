import { CreateEmployeeRecordDto, EmployeeRecordDto } from "@/types/employeeRecord";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default class CreateEmployeeRecord
  extends SecureUseCase
  implements UseCase<CreateEmployeeRecordDto & { file: File | null }, Promise<EmployeeRecordDto>>
{
  async execute(data: CreateEmployeeRecordDto & { file: File | null }): Promise<EmployeeRecordDto> {
    const url = new URL(`EmployeeRecord`, process.env.NEXT_PUBLIC_BACKEND_URL);

    const formData = new FormData();
    formData.append("telephone", data.telephone);
    formData.append("adresse", data.adresse);
    formData.append("birthday", data.birthday);
    formData.append("poste", data.poste);
    formData.append("profil", data.profil);
    formData.append("grossSalary", data.grossSalary.toString());
    if (data.employeeId) {
      formData.append("employeeId", data.employeeId.toString());
    }
    if (data.file) {
      formData.append("cvFile", data.file);
    }

    const response = await fetchWithAuth(url, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to create employee record");
    }

    return await response.json();
  }
} 