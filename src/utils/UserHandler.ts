import { BaseAction, IPagination, UserFilters } from "@/types/query";
import { BaseHandler } from "./BaseHandler";

export const UserHandler: IPagination<UserFilters> = {
  ...BaseHandler<UserFilters>(),
  searchUser: (state, action: BaseAction) => ({ ...state, searchTerm: action.value }),
  filterRole: (state, action) => ({ ...state, role: action.value }),
  addUser: (state, action) => ({ ...state }),
};
