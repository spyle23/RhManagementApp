import { IPagination, TeamFilters } from "@/types/query";
import { BaseHandler } from "./BaseHandler";

export const TeamHandler: IPagination<TeamFilters> = {
  ...BaseHandler<TeamFilters>(),
  search: (state, action) => ({ ...state, searchTerm: action.value })
}; 