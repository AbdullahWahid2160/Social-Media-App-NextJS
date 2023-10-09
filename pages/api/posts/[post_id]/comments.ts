import { NextApiRequest, NextApiResponse } from "next";

import supabase from "../../../../src/utils/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Handle GET request to fetch user profiles
    try {
      const { post_id } = req.query;

      // Check from the Post_Likes Table if the entry of a particular post is present or not against a specific user.
      const { data: postCommentsData, error: postCommentsError } =
        await supabase.from("postComments").select("*").eq("post_id", post_id);

      if (postCommentsError) {
        throw postCommentsError;
      }

      const commenters = postCommentsData.map((comment) => {
        return comment.user_id;
      });

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, username")
        .in("id", commenters);

      if (userError) {
        throw userError;
      }

      const commentsResult = postCommentsData.map((commentData) => {
        const users = userData.find((user) => commentData.user_id === user.id);
        return {
          commenter: users?.username,
          comment: commentData.comment,
        };
      });

      res.status(200).json(commentsResult);
    } catch (error) {
      res.status(500).json({ error: "Error Fetching Comments on the Post." });
    }
  } else {
    // Handle other HTTP methods (e.g., POST for creating user profiles)
    res.status(405).json({ error: "Method not allowed" });
  }
};
