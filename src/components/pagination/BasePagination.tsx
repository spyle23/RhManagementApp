import { FC } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type BasePaginationProps = {
  totalPage: number;
  currPage: number;
  onGoToSpecificPage: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
};

export const BasePagination: FC<BasePaginationProps> = ({
  currPage,
  onNext,
  onPrev,
  onGoToSpecificPage,
  totalPage,
}) => {
  const arrays = Array.from({ length: totalPage }, (_, index) => index + 1);
  const handleClickNumber = (v: number) => {
    if (v !== currPage) {
      onGoToSpecificPage(v);
    }
  };
  return (
    <div className="flex w-full justify-between items-center my-4">
      <button
        onClick={onPrev}
        disabled={currPage === 1}
        className={`px-4 py-2 rounded-md flex items-center ${
          currPage === 1 ? "bg-gray-300" : "bg-white"
        }`}
      >
        <ChevronLeftIcon className="h-5 w-5 mr-2" />
        précedent
      </button>
      <div className="flex w-auto">
        {arrays.map((v) => (
          <span
            key={v}
            className={`relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 ${
              currPage === v
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            }`}
            onClick={() => handleClickNumber(v)}
          >
            {v}
          </span>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={currPage === totalPage}
        className={`px-4 py-2 rounded-md flex items-center ${
          currPage === totalPage ? "bg-gray-300" : "bg-white"
        }`}
      >
        suivant
        <ChevronRightIcon className="h-5 w-5 ml-2" />
      </button>
    </div>
  );
};
