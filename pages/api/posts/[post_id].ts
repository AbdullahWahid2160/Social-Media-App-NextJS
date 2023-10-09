import { NextApiRequest, NextApiResponse } from "next";

import supabase from "../../../src/utils/supabase";
import { format_date } from "@/utils/date";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Handle GET request to fetch user profiles
    try {
      const { post_id } = req.query;

      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select("*")
        .limit(1)
        .eq("id", post_id)
        .single();

      if (postError) {
        throw postError;
      }

      const { data: authorData, error: authorError } = await supabase
        .from("users")
        .select("*")
        .limit(1)
        .eq("id", postData.author_id)
        .single();

      if (authorError) {
        throw authorError;
      }

      const { data: authorProfileData, error: authorProfileError } =
        await supabase
          .from("profiles")
          .select("*")
          .limit(1)
          .eq("user_id", authorData.id)
          .single();

      if (authorProfileError) {
        throw authorProfileError;
      }

      const { data: commentsData, error: commentsError } = await supabase
        .from("postComments")
        .select("*")
        .in("post_id", [post_id]);

      if (commentsError) {
        throw commentsError;
      }

      const commenters = commentsData.map((comment) => comment.user_id);

      const { data: commentersData, error: commentersError } = await supabase
        .from("users")
        .select("id, username")
        .in("id", commenters);


      const commentDetails = commentsData.map((comment) => {
        const commenter = commentersData?.find(
          (user) => user.id === comment.user_id
        );
        if (comment.user_id === commenter?.id) {
          const date = format_date(comment.updated_at);
          return {
            commenter: commenter?.username,
            comment: comment.comment,
            created_at: `${date.toDateString()} ${date.toLocaleTimeString()}`,
          };
        }
      });

      const date = format_date(postData.updated_at);

      const combinedData = {
        id: postData.id,
        author: authorData ? authorData.username : null,
        avatar: authorProfileData ? authorProfileData.avatar : null,
        content: postData.content,
        image: postData.post_image ? postData.post_image : null,
        likesCount: postData.likes_count,
        commentsCount: postData.comments_count,
        sharesCount: postData.shares_count,
        commentDetails: commentDetails,
        created_at: `${date.toDateString()} ${date.toLocaleTimeString()}`,
      };

      res.status(200).json(combinedData);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user profiles" });
    }
  } else {
    // Handle other HTTP methods (e.g., POST for creating user profiles)
    res.status(405).json({ error: "Method not allowed" });
  }
};
