// "use client";
import { getUserProfile } from "@/services/profile";
import { UserContent } from "./components/content_section";
import { UserInformation } from "./components/information_section";
import { ProfileProps, User } from "@/interfaces/interfaces";
import { UserProfileEditing } from "./components/editing_section";
import { UserProfileHeader } from "./components/header_section";

const UserProfilePage = async (props: ProfileProps) => {
  const user: User = await getUserProfile(props.params.username);

  // Function to handle post expansion

  const numColumns = 3;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* User Profile Header */}
        <UserProfileHeader user={user} />

        {/* User Stats */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-gray-500">Posts</p>
              <p className="text-2xl font-semibold">{user?.posts?.length}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Followers</p>
              <p className="text-2xl font-semibold">
                {user?.followers?.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Following</p>
              <p className="text-2xl font-semibold">
                {user?.following?.length}
              </p>
            </div>
          </div>
        </div>

        {/* User Information */}
        <UserInformation user={user} />

        {/* User Content */}
        <UserContent userPosts={user.postsData} columns={numColumns} />

        {/* User Profile Details */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Joined</p>
              <p>{user?.created_at}</p>
            </div>
            <div>
              <p className="text-gray-500">Last Updated</p>
              <p>{user?.updated_at}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
