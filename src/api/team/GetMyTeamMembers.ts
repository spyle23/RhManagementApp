import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { TeamMember } from "@/types/team";

export default class GetMyTeamMembers
  extends SecureUseCase
  implements UseCase<void, Promise<TeamMember[]>>
{
  async execute(): Promise<TeamMember[]> {
    const url = new URL("Team/my-team/members", process.env.NEXT_PUBLIC_BACKEND_URL);

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