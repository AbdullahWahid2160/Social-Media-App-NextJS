import { NextApiRequest, NextApiResponse } from "next";

import supabase from "../../../../../src/utils/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Handle GET request to fetch user profiles
    try {
      const { post_id, user_id } = req.query;
      const likesDetails = {
        post_id,
        user_id,
      };
      let updatedLikesCount: number;

      // Check from the Post_Likes Table if the entry of a particular post is present or not against a specific user.
      const { data: postLikesData, error: postLikesError } = await supabase
        .from("postLikes")
        .select()
        .eq("post_id", post_id)
        .eq("user_id", user_id)
        .single();

      console.log("Data: ", postLikesData);

      // Now if the Post_likes table have that entry already, Delete like and update count to be decremented in Posts Table
      if (postLikesData) {
        // If liked already remove like and decrement the number of Likes in Posts table by 1
        // Update Likes Count of User Profile
        const { data: decrementData, error: decrementError } =
          await supabase.rpc("decrement_count", {
            table_name: "posts",
            column_name: "likes_count",
            x: 1,
            row_id: post_id,
          });
        console.log("Decremented Data: ", decrementData);
        // If Decrement Error Throw it
        if (decrementError) {
          throw decrementError;
        }
        // Delete Like Record From Database
        const { error: deleteError } = await supabase
          .from("postLikes")
          .delete()
          .eq("id", postLikesData.id);

        // if Delete Error then throw it.
        if (deleteError) {
          throw deleteError;
        }
        updatedLikesCount = decrementData;
        res.status(200).json({ updatedLikesCount });
      } else {
        // Else Add New Like And Increment The Number Of Likes In Posts Table By One
        // Update Likes count for User profile
        const { data: incrementData, error: incrementError } =
          await supabase.rpc("increment_count", {
            table_name: "posts",
            column_name: "likes_count",
            x: 1,
            row_id: post_id,
          });

        console.log("Increment Data: ", incrementData);

        // If increment Error Throw it
        if (incrementError) {
          throw incrementError;
        }
        // Insert new record to likes table with liker id , post Id.
        const { data: likesData, error: likesError } = await supabase
          .from("postLikes")
          .insert([likesDetails])
          .select()
          .single();
        //If insert into database fails then throw an error
        if (likesError) {
          throw likesError;
        }
        updatedLikesCount = incrementData;
        res.status(200).json({ updatedLikesCount, likesData });
      }
    } catch (error) {
      res.status(500).json({ error: "Error Liking Post" });
    }
  } else {
    // Handle other HTTP methods (e.g., POST for creating user profiles)
    res.status(405).json({ error: "Method not allowed" });
  }
};
