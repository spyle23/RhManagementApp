import { Role } from "./user";

export type BaseFilters = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
};

export type UserFilters = {
  role?: Role;
} & BaseFilters;

export type BaseAction<TValue = any> = {
  type: string;
  value: TValue;
  [key: string]: any;
};

export type IPagination<TState, TAction extends BaseAction> = {
  goNext: (state: TState) => TState;
  goPrev: (state: TState) => TState;
  goSpecificPage: (state: TState, action: TAction) => TState;
  changeListPerPage: (state: TState, action: TAction) => TState;
  [key: string]: (state: TState, action: TAction) => TState;
};
