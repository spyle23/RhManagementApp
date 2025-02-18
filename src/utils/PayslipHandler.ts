import { IPagination, PayslipFilters } from "@/types/query";
import { BaseHandler } from "./BaseHandler";

export const PayslipHandler: IPagination<PayslipFilters> = {
  ...BaseHandler<PayslipFilters>(),
  search: (state, action) => ({ ...state, searchTerm: action.value })
}; 