import { NextApiRequest, NextApiResponse } from "next";

import supabase from "../../../src/utils/supabase";
import { format_date } from "@/utils/date";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Handle GET request to fetch user profiles
    try {
      const { userId } = req.query;

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .limit(1)
        .eq("id", userId)
        .single();

      if (userError) {
        throw userError;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .limit(1)
        .eq("user_id", userId)
        .single();

      if (profileError) {
        throw profileError;
      }

      const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .in("id", profileData.posts);

      if (postsError) {
        throw postsError;
      }

      const postsData = posts.map((post) => {
        const date = format_date(post.created_at);
        return {
          id: post.id,
          author: userData ? userData.username : null,
          avatar: profileData ? profileData.avatar : null,
          content: post.content,
          image: post.post_image ? post.post_image : null,
          likesCount: post.likes_count,
          commentsCount: post.comments_count,
          sharesCount: post.shares_count,
          created_at: `${date.toDateString()} ${date.toLocaleTimeString()}`,
        };
      });

      const combinedData = { ...profileData, email: userData.email, postsData };

      res.status(200).json(combinedData);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user profiles" });
    }
  } else {
    // Handle other HTTP methods (e.g., POST for creating user profiles)
    res.status(405).json({ error: "Method not allowed" });
  }
};
