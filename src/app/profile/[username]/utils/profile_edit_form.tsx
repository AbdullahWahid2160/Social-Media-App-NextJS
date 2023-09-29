import { EditedUserData } from "@/interfaces/interfaces";
import React, { useState } from "react";

interface ProfileEditingProps {
  onSave: (formData: EditedUserData) => void;
}

const ProfileEditing: React.FC<ProfileEditingProps> = ({ onSave }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    website: "",
    // Add other editable fields here
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="flex flex-col w-3/4 items-center">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex items-center flex-col">
        <div>
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-white font-medium"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full shadow-lg rounded-md p-2 outline-none text-black focus:outline-gray-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-white font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full shadow-lg rounded-md p-2 outline-none text-black focus:outline-gray-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-white font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full shadow-lg rounded-md p-2 outline-none text-black focus:outline-gray-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="website" className="block text-white font-medium">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full shadow-lg rounded-md p-2 outline-none text-black focus:outline-gray-600"
            />
          </div>
        </div>
        {/* Add other editable fields here */}
        <div>
          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-600 text-white font-semibold px-4 py-2 mt-5 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditing;
