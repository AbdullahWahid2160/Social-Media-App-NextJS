import axios from "axios";

export const fetchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/feed");
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Posts fetching failed:", response.data.error);
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
};
