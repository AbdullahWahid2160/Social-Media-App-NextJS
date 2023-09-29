import PostCard from "../components/PostCard";
import { fetchPosts } from "@/services/posts";
import { FeedData } from "@/interfaces/interfaces";

export default async function Feed() {
  const feedData = await fetchPosts();

  return (
    <div className={`mx-auto mt-24 mb-24`}>
      {feedData.map((item: FeedData) => (
        <PostCard post={item} key={item.id} />
      ))}
    </div>
  );
}
