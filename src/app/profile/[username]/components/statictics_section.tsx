import React from "react";
import { UserInfoProps } from "@/interfaces/interfaces";

export const UserProfileStats: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-gray-500">Posts</p>
          <p className="text-2xl font-semibold">{user?.posts?.length}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Followers</p>
          <p className="text-2xl font-semibold">{user?.followers?.length}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Following</p>
          <p className="text-2xl font-semibold">{user?.following?.length}</p>
        </div>
      </div>
    </div>
  );
};
