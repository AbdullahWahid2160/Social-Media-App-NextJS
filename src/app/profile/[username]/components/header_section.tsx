"use client";
import React from "react";
import { UserInfoProps } from "@/interfaces/interfaces";
import { UserProfileEditing } from "./editing_section";

export const UserProfileHeader: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-8 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-2/4">
          <img
            src={user?.avatar}
            alt={`${user?.first_name} ${user?.last_name}'s Avatar`}
            className="w-16 h-16 rounded-full border-4 border-white"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-semibold">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-sm">{user?.bio}</p>
            <a
              href={user?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-blue-300 text-sm"
            >
              {user?.website}
            </a>
          </div>
        </div>
        {/* User Profile Edit */}
        <div className="flex w-1/2 align-center justify-center">
          <UserProfileEditing user={user} />
        </div>
      </div>
    </div>
  );
};
