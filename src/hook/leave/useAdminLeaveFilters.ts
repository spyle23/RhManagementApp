import { BaseAction, LeaveFilters } from "@/types/query";
import { useGenericFilters } from "../useGenericFilters";
import { LeaveHandler } from "@/utils/LeaveHandler";
import { LeaveResult, LeaveStatus } from "@/types/leave";
import GetLeaveByAdminFilters from "@/api/leaves/GetLeaveByAdminFilters";

const reducerFilters = (state: LeaveFilters, action: BaseAction) => {
  return LeaveHandler[action.type]
    ? LeaveHandler[action.type](state, action)
    : state;
};

const initialState: LeaveFilters = {
  pageNumber: 1,
  pageSize: 10,
  status: "",
  type: "",
  searchTerm: ""
};

export const useAdminLeaveFilter = () => {
  const val = useGenericFilters<
    LeaveFilters,
    LeaveResult,
    GetLeaveByAdminFilters
  >(reducerFilters, initialState, GetLeaveByAdminFilters);

  const { setData } = val;

  const changeStatusAfterAction = (updated: LeaveResult) => {
    setData((curr) => ({
      ...curr,
      datas: curr.datas.map((a) =>
        a.id === updated.id ? { ...a, status: updated.status } : a
      ),
    }));
  };

  return { ...val, changeStatusAfterAction };
};
