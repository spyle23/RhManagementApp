import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { TeamMember } from "@/types/team";

export default class GetTeamMembers
  extends SecureUseCase
  implements UseCase<number, Promise<TeamMember[]>>
{
  async execute(teamId: number): Promise<TeamMember[]> {
    const url = new URL(`Team/${teamId}/members`, process.env.NEXT_PUBLIC_BACKEND_URL);

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