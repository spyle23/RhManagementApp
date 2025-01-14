import { BaseAction, IPagination, UserFilters } from "@/types/query";

export const UserHandler: IPagination<UserFilters, BaseAction> = {
  goNext: (state) => ({ ...state, pageNumber: state.pageNumber + 1 }),
  goPrev: (state) => ({ ...state, pageNumber: state.pageNumber - 1 }),
  goSpecificPage: (state, action) => ({ ...state, pageNumber: action.value }),
  changeListPerPage: (state, action) => ({ ...state, pageSize: action.value }),
  searchUser: (state, action) => ({ ...state, searchTerm: action.value }),
  filterRole: (state, action) => ({ ...state, role: action.value }),
};
