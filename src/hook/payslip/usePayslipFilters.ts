import { BaseAction, PayslipFilters } from "@/types/query";
import { useGenericFilters } from "../useGenericFilters";
import { PayslipHandler } from "@/utils/PayslipHandler";
import { PayslipResult } from "@/types/payslip";
import GetMyPayslipHistory from "@/api/payslip/GetMyPayslipHistory";

const reducerFilters = (state: PayslipFilters, action: BaseAction) => {
  return PayslipHandler[action.type]
    ? PayslipHandler[action.type](state, action)
    : state;
};

const initialState: PayslipFilters = {
  pageNumber: 1,
  pageSize: 10,
  searchTerm: ""
};

export const usePayslipFilters = () => {
  const val = useGenericFilters<
    PayslipFilters,
    PayslipResult,
    GetMyPayslipHistory
  >(reducerFilters, initialState, GetMyPayslipHistory);

  return { ...val };
}; 