import supabase from "@/utils/supabase";
import axios from "axios";

export const fetchPosts = async (user: string | undefined) => {
  try {
    const response = await axios.get("http://localhost:3000/api/feed", {
      withCredentials: true,
      headers: {
        Cookies: user,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Posts fetching failed:", response.data.error);
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
};

export const fetchPostDetails = async (
  post_id: string,
  user_id: string | undefined
) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/posts/${post_id}`,
      {
        withCredentials: true,
        headers: {
          Cookies: user_id,
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed Fetching Post Details: ", response.data.error);
    }
  } catch (error) {
    console.error("Fetching Post Details Error:", error);
  }
};

export const likeUnLikePost = async (post_id: string, liker_id: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/posts/${post_id}/like/${liker_id}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed Liking the post", response.data.error);
    }
  } catch (error) {
    console.error("Liking Post error:", error);
  }
};

export const postComment = async (
  post_id: string,
  user_id: string,
  comment: string
) => {
  let postedCommentResult = undefined;
  let updatedPostResult = undefined;
  try {
    const commentResponse = await axios.post(
      `http://localhost:3000/api/posts/${post_id}/comment/${user_id}`,
      { comment }
    );
    if (commentResponse.status === 200) {
      postedCommentResult = commentResponse.data;
    } else {
      console.error("Failed Commenting the post", commentResponse.data.error);
    }
    const postResponse = await fetchPostDetails(post_id, user_id);
    if (postResponse.status === 200) {
      updatedPostResult = postResponse;
    }
    return { postedCommentResult, updatedPostResult };
  } catch (error) {
    console.error(`Error commenting on the post: ${post_id}`);
  }
};

export const sharePost = async (post_id: number) => {
  console.log("Post Shared: ", post_id);
  try {
    const { data, error } = await supabase.rpc("increment_1", {
      x: 1,
      row_id: post_id,
    });

    if (error) {
      throw error;
    }
    console.log("Response: ", data);

    return data;
  } catch (error) {
    console.error("Error fetching user profiles");
  }
};
