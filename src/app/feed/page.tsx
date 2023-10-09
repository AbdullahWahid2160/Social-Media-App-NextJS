import { fetchPosts } from "@/services/posts";
import { FeedData } from "@/interfaces/interfaces";
import { cookies } from "next/headers";
import Link from "next/link";

const user = cookies().get("user")?.value;

export default async function Feed() {
  const feedData = await fetchPosts(user);

  return (
    <div className={`mx-auto mt-24 mb-24 w-full`}>
      {feedData.map((item: FeedData) => {
        // <PostCard post={item} key={item.id} />
        return (
          <Link href={`/feed/${item.id}`}>
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-md p-4 mb-4 w-full`}
            >
              {/* User Info */}
              <div className="mb-3">
                <div className="flex items-center">
                  <img
                    src={item.avatar}
                    alt={`${item.author}'s avatar`}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-semibold text-gray-800">
                    {item.author}
                  </span>
                </div>
                <span className="font-semibold text-gray-400 text-sm">
                  {item.created_at}
                </span>
              </div>
              <hr className="my-3" />
              {/* Post Content */}
              <p className="text-gray-700 mb-4">{item.content}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
