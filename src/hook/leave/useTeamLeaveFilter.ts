import { BaseAction, LeaveFilters } from "@/types/query";
import { useGenericFilters } from "../useGenericFilters";
import { LeaveHandler } from "@/utils/LeaveHandler";
import { LeaveResult, LeaveStatus } from "@/types/leave";
import GetTeamLeaves from "@/api/team/GetTeamLeaves";

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

export const useTeamLeaveFilter = () => {
  const val = useGenericFilters<
    LeaveFilters,
    LeaveResult,
    GetTeamLeaves
  >(reducerFilters, initialState, GetTeamLeaves);

  const { setData } = val;

  const changeStatusAfterAction = (updated: LeaveResult) => {
    setData((curr) => ({
      ...curr,
      datas: curr.datas.map((a) =>
        a.id === updated.id ? { ...a, rhStatus: updated.status } : a
      ),
    }));
  };

  return { ...val, changeStatusAfterAction };
}; 