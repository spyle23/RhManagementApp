import { BaseAction, LeaveFilters } from "@/types/query";
import { useGenericFilters } from "../useGenericFilters";
import { LeaveHandler } from "@/utils/LeaveHandler";
import { LeaveResult } from "@/types/leave";
import GetLeaveByFilters from "@/api/leaves/GetLeaveByFilters";

const reducerFilters = (state: LeaveFilters, action: BaseAction) => {
  return LeaveHandler[action.type]
    ? LeaveHandler[action.type](state, action)
    : state;
};

const initialState: LeaveFilters = {
  pageNumber: 1,
  pageSize: 10,
  status: "",
  type: ""
};

export const useLeaveFilter = () => {
  const val = useGenericFilters<LeaveFilters, LeaveResult, GetLeaveByFilters>(
    reducerFilters,
    initialState,
    GetLeaveByFilters
  );

  return { ...val };
};
