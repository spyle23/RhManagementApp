import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default class DownloadPayslip
  extends SecureUseCase
  implements UseCase<number, Promise<Blob>>
{
  async execute(id: number): Promise<Blob> {
    const url = new URL(`Payslip/Pdf/${id}`, process.env.NEXT_PUBLIC_BACKEND_URL);
    
    const response = await fetchWithAuth(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to download payslip");
    }

    return await response.blob();
  }
} 