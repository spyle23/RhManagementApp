import { EmployeeRecordFilters, IPagination } from "@/types/query";
import { BaseHandler } from "./BaseHandler";

export const EmployeeRecordHandler: IPagination<EmployeeRecordFilters> = {
  ...BaseHandler<EmployeeRecordFilters>(),
  filterStatus: (state, action) => ({ ...state, status: action.value }),
  search: (state, action) => ({ ...state, searchTerm: action.value }),
};
