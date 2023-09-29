import { UserInfoProps } from "@/interfaces/interfaces";

export const UserInformation: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">User Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">Email</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className="text-gray-500">Location</p>
          <p>{user.location}</p>
        </div>
        <div>
          <p className="text-gray-500">Date of Birth</p>
          <p>{user.date_of_birth}</p>
        </div>
      </div>
    </div>
  );
};
