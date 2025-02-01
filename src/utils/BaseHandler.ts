import { BaseAction, BaseFilters, IPagination } from "@/types/query";

export const BaseHandler = <
  TFilter extends BaseFilters
>(): IPagination<TFilter> => {
  return {
    goNext: (state) => ({ ...state, pageNumber: state.pageNumber + 1 }),
    goPrev: (state) => ({ ...state, pageNumber: state.pageNumber - 1 }),
    goSpecificPage: (state, action) => ({ ...state, pageNumber: action.value }),
    changeListPerPage: (state, action) => ({
      ...state,
      pageSize: action.value,
    }),
  };
};
