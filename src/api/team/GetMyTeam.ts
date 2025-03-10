import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";
import { TeamWithManagerDetails } from "@/types/team";

export default class GetMyTeam
  extends SecureUseCase
  implements UseCase<void, Promise<TeamWithManagerDetails>>
{
  async execute(): Promise<TeamWithManagerDetails> {
    const url = new URL("Team/my-team", process.env.NEXT_PUBLIC_BACKEND_URL);

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