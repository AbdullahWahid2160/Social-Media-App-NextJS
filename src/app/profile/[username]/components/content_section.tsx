import { FeedData, UserContentProps } from "@/interfaces/interfaces";

export const UserContent: React.FC<UserContentProps> = ({
  userPosts,
  columns,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      <div className={`grid grid-cols-${columns} gap-4`}>
        {userPosts?.map((post: FeedData) => (
          <div
            key={post.id}
            className={`${
              post.image ? "cursor-pointer" : ""
            } relative border border-gray-200 rounded-md p-2 bg-blue-100 hover:bg-blue-300`}
          >
            {post.image && (
              <img
                src={post.image}
                alt={`Post ${post.id}`}
                className="w-full h-auto rounded-md mb-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
