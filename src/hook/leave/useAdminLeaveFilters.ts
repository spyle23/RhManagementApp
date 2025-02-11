import { BaseAction, LeaveFilters } from "@/types/query";
import { useGenericFilters } from "../useGenericFilters";
import { LeaveHandler } from "@/utils/LeaveHandler";
import { LeaveResult, LeaveStatus } from "@/types/leave";
import GetLeaveByAdminFilters from "@/api/leaves/GetLeaveByAdminFilters";
import { Role } from "@/types/user";
import GetEmployeeLeavesForRh from "@/api/leaves/GetEmployeeLeavesForRh";

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
  searchTerm: "",
};

export const useAdminLeaveFilter = (role?: Role) => {
  const val =
    role === "Admin"
      ? useGenericFilters<LeaveFilters, LeaveResult, GetLeaveByAdminFilters>(
          reducerFilters,
          initialState,
          GetLeaveByAdminFilters
        )
      : useGenericFilters<LeaveFilters, LeaveResult, GetEmployeeLeavesForRh>(
          reducerFilters,
          initialState,
          GetEmployeeLeavesForRh
        );

  const { setData } = val;

  const changeStatusAfterAction = (updated: LeaveResult, role: Role) => {
    setData((curr) => ({
      ...curr,
      datas: curr.datas.map((a) =>
        a.id === updated.id
          ? {
              ...a,
              status: role === "Admin" ? updated.status : a.status,
              rhStatus: role === "RH" ? updated.rhStatus : a.rhStatus,
            }
          : a
      ),
    }));
  };

  return { ...val, changeStatusAfterAction };
};
