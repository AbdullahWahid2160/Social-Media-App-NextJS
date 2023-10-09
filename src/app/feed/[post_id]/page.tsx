import { cookies } from "next/headers";

import PostCard from "../components/PostCard";
import { fetchPostDetails } from "@/services/posts";

const user = () => cookies().get("user")?.value;
export default async function Post(props: { params: { post_id: string } }) {
  const postDetails = await fetchPostDetails(props.params.post_id, user());

  return (
    <div className={`mx-auto mt-24 mb-24 w-full`}>
      <PostCard post={postDetails} />
    </div>
  );
}
