import UseCase from "@/api/interfaces/UseCase";
import SecureUseCase from "@/api/SecureUseCase";
import { useApplication } from "@/store/useApplication";
import { BasePagination } from "@/types/BasePagination";
import { BaseAction, BaseFilters } from "@/types/query";
import { Reducer, useEffect, useReducer, useState } from "react";

export const useGenericFilters = <
  TFIlters extends BaseFilters,
  TResult extends { id: number },
  TUseCase extends SecureUseCase &
    UseCase<TFIlters, Promise<BasePagination<TResult>>>
>(
  reducer: Reducer<TFIlters, BaseAction>,
  initialState: TFIlters,
  UseCase: new (token: string) => TUseCase
) => {
  const { user } = useApplication();
  const [stateFilters, dispatchFilters] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<BasePagination<TResult>>({
    datas: [],
    totalPage: 0,
  });
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          setLoading(true);
          const instanceUseCase = new UseCase(user.token);
          const data = await instanceUseCase.execute(stateFilters);
          setData(data);
        } catch (error: any) {
          if ("message" in error) {
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [stateFilters, user]);

  const addItem = (val: TResult) => {
    setData((curr) => ({ ...curr, datas: [val, ...curr.datas] }));
  };

  const updateItem = (val: TResult) => {
    setData((curr) => ({
      ...curr,
      datas: curr.datas.map((a) => (a.id === val.id ? val : a)),
    }));
  };

  return {
    data,
    loading,
    error,
    dispatchFilters,
    stateFilters,
    addItem,
    updateItem
  };
};
