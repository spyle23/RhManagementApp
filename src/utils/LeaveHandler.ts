import { IPagination, LeaveFilters } from "@/types/query";
import { BaseHandler } from "./BaseHandler";

export const LeaveHandler: IPagination<LeaveFilters> = {
  ...BaseHandler<LeaveFilters>(),
  filterType: (state, action) => ({ ...state, type: action.value }),
  filterStatus: (state, action) => ({ ...state, status: action.value }),
};
