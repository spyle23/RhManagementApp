import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";

export default class DeleteTeam
  extends SecureUseCase
  implements UseCase<number, Promise<{ message: string }>>
{
  async execute(teamId: number): Promise<{ message: string }> {
    const url = new URL(`Team/${teamId}`, process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetchWithAuth(url, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to delete team");
    }

    return await response.json();
  }
} 