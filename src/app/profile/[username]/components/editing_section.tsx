"use client";
import { EditedUserData, UserInfoProps } from "@/interfaces/interfaces";
import React, { useState } from "react";
import ProfileEditing from "../utils/profile_edit_form";
import axios from "axios";
import { useRouter } from "next/navigation";

export const UserProfileEditing: React.FC<UserInfoProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  // Function to save edited user data
  const handleSaveProfile = async (formData: EditedUserData) => {
    // Perform the API call to save the edited data
    // You can replace this with your API integration
    try {
      const updatedProfile = await axios.post(
        "http://localhost:3000/api/profile/edit",
        {
          id: user.user_id,
          updatedData: formData,
        }
      );

      if (updatedProfile.status === 200) {
        window.location.reload();
        
      } else {
        console.error("Login failed:", updatedProfile.data.error);
        // Handle login failure (e.g., display an error message)
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle the error
    }

    // Exit edit mode
    setIsEditing(false);
  };
  return (
    //  Profile Editing
    isEditing ? (
      <ProfileEditing onSave={handleSaveProfile} />
    ) : (
      <div className="flex ml-40">
        <button
          className="bg-gray-800 hover:bg-gray-600 text-white font-semibold px-3 py-2 rounded-md"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>
      </div>
    )
  );
};
