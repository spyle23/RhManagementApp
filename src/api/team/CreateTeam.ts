import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { TeamWithManagerDetails } from "@/types/team";

type CreateTeamInput = {
  name: string;
  speciality: string;
  managerId: number;
};

export default class CreateTeam
  extends SecureUseCase
  implements UseCase<CreateTeamInput, Promise<TeamWithManagerDetails>>
{
  async execute(data: CreateTeamInput): Promise<TeamWithManagerDetails> {
    const url = new URL("Team", process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetchWithAuth(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to create team");
    }

    return await response.json();
  }
} 