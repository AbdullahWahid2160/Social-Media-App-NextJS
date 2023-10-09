import { NextApiRequest, NextApiResponse } from "next";

import supabase from "../../../../../src/utils/supabase";
import { format_date } from "@/utils/date";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Handle GET request to fetch user profiles
    try {
      const { post_id, user_id } = req.query;
      const { comment } = req.body;
      const commentDetails = {
        post_id,
        user_id,
        comment,
      };
      let updatedCommentsCount: number;

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("username")
        .eq("id", user_id)
        .single();

      // Check from the Post_Likes Table if the entry of a particular post is present or not against a specific user.
      const { data: postCommentsData, error: postCommentsError } =
        await supabase
          .from("postComments")
          .select()
          .eq("post_id", post_id)
          .eq("user_id", user_id)
          .eq("comment", comment)
          .single();

      // Now if the postComments table have that entry already, Delete Comment and update count to be decremented in Posts Table
      if (postCommentsData) {
        // If commented already with same content, remove comment and decrement the number of Comments in Posts table by 1
        // Update Comments Count of User Profile
        const { data: decrementCommentsData, error: decrementCommentsError } =
          await supabase.rpc("decrement_count", {
            table_name: "posts",
            column_name: "comments_count",
            x: 1,
            row_id: post_id,
          });
        // If Decrement Error Throw it
        if (decrementCommentsError) {
          throw decrementCommentsError;
        }
        // Delete Comment Record From Database
        const { error: deleteError } = await supabase
          .from("postComments")
          .delete()
          .eq("id", postCommentsData.id);

        // if Delete Error then throw it.
        if (deleteError) {
          throw deleteError;
        }
        updatedCommentsCount = decrementCommentsData;
        res.status(200).json({ updatedCommentsCount });
      } else {
        // Else Add New Comment And Increment The Number Of Comments In Posts Table By One
        // Update Comments count for User profile
        const { data: incrementCommentsData, error: incrementCommentsError } =
          await supabase.rpc("increment_count", {
            table_name: "posts",
            column_name: "comments_count",
            x: 1,
            row_id: post_id,
          });

        // If increment Error Throw it
        if (incrementCommentsError) {
          throw incrementCommentsError;
        }
        // Insert new record to comments table with Commenter Id , post Id.
        const { data: commentsData, error: commentsError } = await supabase
          .from("postComments")
          .insert([commentDetails])
          .select()
          .single();
        //If insert into database fails then throw an error
        if (commentsError) {
          throw commentsError;
        }

        const date = format_date(commentsData.updated_at);

        const commentData = {
          comment: commentsData.comment,
          commenter: userData?.username,
          created_at: `${date.toDateString()} ${date.toLocaleTimeString()}`,
        };

        updatedCommentsCount = incrementCommentsData;
        res.status(200).json({ updatedCommentsCount, commentData });
      }
    } catch (error) {
      res.status(500).json({ error: "Error Commenting on Post" });
    }
  } else {
    // Handle other HTTP methods (e.g., POST for creating user profiles)
    res.status(405).json({ error: "Method not allowed" });
  }
};
