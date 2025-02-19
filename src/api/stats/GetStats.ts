import { fetchWithAuth } from "@/utils/fetchWithAuth";
import UseCase from "../interfaces/UseCase";
import SecureUseCase from "../SecureUseCase";

export type StatsResult = {
  currentPendingLeavesCount: number;
  lastMonthPendingLeavesCount: number;
  pendingLeavesRate: number;
  currentMonthEmployeeCount: number;
  lastMonthEmployeeCount: number;
  employeeGrowthRate: number;
};

export default class GetStats
  extends SecureUseCase
  implements UseCase<void, Promise<StatsResult>>
{
  async execute(): Promise<StatsResult> {
    const url = new URL("Statistic/leave-stats", process.env.NEXT_PUBLIC_BACKEND_URL);

    const response = await fetchWithAuth(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to fetch statistics");
    }

    return await response.json();
  }
} 