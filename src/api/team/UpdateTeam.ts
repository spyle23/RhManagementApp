import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { TeamWithManagerDetails } from "@/types/team";

type UpdateTeamInput = {
  id: number;
  name: string;
  speciality: string;
  managerId: number;
};

export default class UpdateTeam
  extends SecureUseCase
  implements UseCase<UpdateTeamInput, Promise<TeamWithManagerDetails>>
{
  async execute(data: UpdateTeamInput): Promise<TeamWithManagerDetails> {
    const url = new URL(`Team/${data.id}`, process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetchWithAuth(url, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        name: data.name,
        speciality: data.speciality,
        managerId: data.managerId
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to update team");
    }

    return await response.json();
  }
} 