"use client";

import { UserHeader } from "@/types/user";
import { useState } from "react";

type UserSelectProps = {
  users: UserHeader[];
  selectedUser?: UserHeader;
  onSelect: (user?: UserHeader) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const UserSelect = ({
  users,
  selectedUser,
  onSelect,
  placeholder = "Select a user",
  disabled = false,
}: UserSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (user?: UserHeader) => {
    if (!disabled) {
      onSelect(user);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`relative w-full bg-white border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          disabled
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300"
        }`}
        disabled={disabled}
      >
        {selectedUser ? (
          <div className="flex items-center">
            {selectedUser.picture ? (
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${selectedUser.picture}`}
                alt="User avatar"
                className="h-6 w-6 rounded-full"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="text-blue-700 font-medium">
                  {selectedUser.firstName.charAt(0)}
                </span>
              </div>
            )}
            <span className="ml-3 block truncate">
              {selectedUser.firstName} {selectedUser.lastName}
            </span>
          </div>
        ) : (
          <span className={disabled ? "text-gray-400" : "text-gray-500"}>
            {placeholder}
          </span>
        )}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className={`h-5 w-5 ${
              disabled ? "text-gray-300" : "text-gray-400"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <div onClick={() => handleSelect(undefined)} className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100">
            {placeholder}
          </div>
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleSelect(user)}
              className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
            >
              <div className="flex items-center">
                {user.picture ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URI}${user.picture}`}
                    alt="User avatar"
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-700 font-medium">
                      {user.firstName.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="ml-3 block font-normal truncate">
                  {user.firstName} {user.lastName}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
