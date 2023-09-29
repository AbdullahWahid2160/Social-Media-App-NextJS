import axios from "axios";

export async function getUserProfile(userID: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/profile/${userID}`
    );

    if (response.status === 200) {
    //   console.log("Profile successful in context:", response.data);
      return response.data;
    } else {
      console.error("Profile failed:", response.data.error);
    }
  } catch (error) {
    console.error("Unhandled error:", error);
  }
}
