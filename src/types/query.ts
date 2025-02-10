import { Role } from "./user";

export type BaseFilters = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
};

export type UserFilters = {
  role?: Role;
} & BaseFilters;

export type LeaveFilters = {
  type?: string;
  status?: string;
} & BaseFilters;

export type EmployeeRecordFilters = {
  status?: string;
} & BaseFilters;

export type BaseAction<TValue = any> = {
  type: string;
  value: TValue;
  [key: string]: any;
};

export type IPagination<TState> = {
  goNext: (state: TState) => TState;
  goPrev: (state: TState) => TState;
  goSpecificPage: (state: TState, action: BaseAction<number>) => TState;
  changeListPerPage: (state: TState, action: BaseAction<number>) => TState;
  [key: string]: (state: TState, action: BaseAction<any>) => TState;
};
