import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default class DownloadEmployeeCV
  extends SecureUseCase
  implements UseCase<string, Promise<Blob>>
{
  async execute(url: string): Promise<Blob> {
    const newUrl = new URL(url, process.env.NEXT_PUBLIC_IMAGE_URI);
    
    const response = await fetchWithAuth(newUrl.toString(), {
      method: "get",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to download employee CV");
    }

    return await response.blob();
  }
} 