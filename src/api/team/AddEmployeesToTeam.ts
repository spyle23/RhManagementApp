import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { Team } from "@/types/team";

type AddEmployeesToTeamInput = {
  teamId: number;
  employeeIds: number[];
};

export default class AddEmployeesToTeam
  extends SecureUseCase
  implements UseCase<AddEmployeesToTeamInput, Promise<Team>>
{
  async execute(data: AddEmployeesToTeamInput): Promise<Team> {
    const url = new URL(`Team/${data.teamId}/add-employees`, process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetchWithAuth(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data.employeeIds),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to add employees to team");
    }

    return await response.json();
  }
} 