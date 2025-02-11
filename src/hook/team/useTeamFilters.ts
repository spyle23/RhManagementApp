import { BaseAction, TeamFilters } from "@/types/query";
import { useGenericFilters } from "../useGenericFilters";
import { TeamHandler } from "@/utils/TeamHandler";
import { TeamWithManagerDetails } from "@/types/team";
import GetTeamFilters from "@/api/team/GetTeamFilters";

const reducerFilters = (state: TeamFilters, action: BaseAction) => {
  return TeamHandler[action.type]
    ? TeamHandler[action.type](state, action)
    : state;
};

const initialState: TeamFilters = {
  pageNumber: 1,
  pageSize: 10,
  searchTerm: "",
};

export const useTeamFilters = () => {
  const val = useGenericFilters<
    TeamFilters,
    TeamWithManagerDetails,
    GetTeamFilters
  >(reducerFilters, initialState, GetTeamFilters);

  const addMembers = (teamId: number, employeesId: number[]) => {
    const { setData } = val;
    setData((curr) => ({
      datas: curr.datas.map((a) =>
        a.id === teamId
          ? { ...a, memberCount: a.memberCount + employeesId.length }
          : a
      ),
      totalPage: curr.totalPage,
    }));
  };

  return { ...val, addMembers };
};
