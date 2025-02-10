import { BaseAction, EmployeeRecordFilters, LeaveFilters } from "@/types/query";
import { useGenericFilters } from "../useGenericFilters";
import { LeaveResult } from "@/types/leave";
import GetLeaveByFilters from "@/api/leaves/GetLeaveByFilters";
import { EmployeeRecordHandler } from "@/utils/EmployeeRecordHandler";
import { EmployeeRecordDto } from "@/types/employeeRecord";
import GetEmployeesRecordByFilters from "@/api/employee/GetEmployeesRecordByFilters";

const reducerFilters = (state: EmployeeRecordFilters, action: BaseAction) => {
  return EmployeeRecordHandler[action.type]
    ? EmployeeRecordHandler[action.type](state, action)
    : state;
};

const initialState: EmployeeRecordFilters = {
  pageNumber: 1,
  pageSize: 10,
  status: "",
  searchTerm: "",
};

export const useEmployeeRecordFilters = () => {
  const val = useGenericFilters<
    EmployeeRecordFilters,
    EmployeeRecordDto,
    GetEmployeesRecordByFilters
  >(reducerFilters, initialState, GetEmployeesRecordByFilters);

  return { ...val };
};
