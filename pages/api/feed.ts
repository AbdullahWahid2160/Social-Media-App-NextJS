import { NextApiRequest, NextApiResponse } from "next";

import supabase from "../../src/utils/supabase";
import { format_date } from "@/utils/date";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Handle GET request to fetch user profiles
    try {
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order('updated_at', { ascending: false })

      if (postsError) {
        throw postsError;
      }

      const authors = postsData.map((post) => post.author_id);

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .in("id", authors);

      if (userError) {
        throw userError;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .in("user_id", authors);

      if (profileError) {
        throw profileError;
      }

      const combinedData = postsData.map((post) => {
        const author = userData.find((user) => user.id === post.author_id);
        const avatar = profileData.find(
          (profile) => profile.user_id === author.id
        );

        const date = format_date(post.updated_at);

        return {
          id: post.id,
          author: author ? author.username : null,
          avatar: avatar ? avatar.avatar : null,
          content: post.content,
          created_at: `${date.toDateString()} ${date.toLocaleTimeString()}`,
        };
      });

      res.status(200).json(combinedData);
    } catch (error) {
      res.status(500).json({ error: "Error fetching posts" });
    }
  } else {
    // Handle other HTTP methods (e.g., POST for creating user profiles)
    res.status(405).json({ error: "Method not allowed" });
  }
};
