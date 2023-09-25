"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export interface FeedData {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  created_at: string;
}

const initialFeedData: Array<FeedData> = [];

export default function Feed() {
  const [feedData, setFeedData] = useState(initialFeedData);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("api/feed");
        if (response.status === 200) {
          console.log("Feed Data: ", response.data);
          setFeedData(response.data);
          // Handle successful login (e.g., redirect to a dashboard)
        } else {
          console.error("Posts fetching failed:", response.data.error);
          // Handle login failure (e.g., display an error message)
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="mx-auto mt-24 mb-24">
      {feedData.map((item) => (
        <PostCard post={item} key={item.id} />
      ))}
    </div>
  );
}
