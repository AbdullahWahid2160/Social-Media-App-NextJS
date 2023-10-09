import { EditedUserData } from "@/interfaces/interfaces";
import axios from "axios";

export async function editUserProfile(userID: string, updatedData: EditedUserData) {
  try {
    const requestBody = {
        id: userID,
        updatedData,
      };
    const response = await axios.get(
      "http://localhost:3000/api/profile/edit", 
    );

    if (response.status === 200) {
      console.log("Profile successful in context:", response.data);
      return response.data;
    } else {
      console.error("Profile failed:", response.data.error);
    }
  } catch (error) {
    console.error("Unhandled error:", error);
  }
}
