import { NextApiRequest, NextApiResponse } from "next";

import supabase from "../../src/app/utils/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Handle GET request to fetch user profiles
    try {
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*");

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

      // const posts = postsData.map((post) => post.id);

      // const { data: likesData, error: likesError } = await supabase
      //   .from("likes")
      //   .select("*")
      //   .in("post_id", posts);

      // if (likesError) {
      //   throw likesError;
      // }

      const combinedData = postsData.map((post) => {
        const author = userData.find((user) => user.id === post.author_id);
        const avatar = profileData.find(
          (profile) => profile.user_id === author.id
        );
        const [dateComponents, timeComponents] = post.created_at.split("T");
        const [year, month, day] = dateComponents.split("-");
        const [time, zone] = timeComponents.split("+");
        const [hours, minutes, seconds] = time.split(":");
        const date = new Date(
          +year,
          month - 1,
          +day,
          +hours,
          +minutes,
          +seconds
        );

        // const likes = likesData
        // ?.filter((like) => like.post_id === post.id)
        //   .map((item) => item.liker_id);
        return {
          id: post.id,
          author: author ? author.username : null,
          avatar: avatar ? avatar.avatar : null,
          content: post.content,
          image: post.post_image ? post.post_image : null,
          likesCount: post.likes_count,
          commentsCount: post.comments_count,
          sharesCount: post.shares_count,
          // likes: likes ? likes : null,
          // comments: likes ? likes : null,
          // shares: likes ? likes : null,
          created_at: `${date.toDateString()}
          
          ${date.toLocaleTimeString()}`,
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
