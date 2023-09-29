import { PostCardProps } from "@/interfaces/interfaces";

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {/* User Info */}
      <div className="mb-3">
        <div className="flex items-center">
          <img
            src={post.avatar}
            alt={`${post.author}'s avatar`}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="font-semibold text-gray-800">{post.author}</span>
        </div>
        <span className="font-semibold text-gray-400 text-sm">
          {post.created_at}
        </span>
      </div>
      <hr className="my-3" />
      {/* Post Content */}
      <p className="text-gray-700 mb-4">{post.content}</p>
      {/* Post Image */}
      <div className="flex justify-center">
        <img
          src={post.image}
          alt="Post"
          className="flex rounded-lg mb-4 w-3/4 h-3/4"
        />
      </div>
      {/* Actions */}
      <hr className="my-3" />
      <div className="flex justify-between py-2">
        <div className="flex">
          <div className="relative inline-flex w-fit my-1 mx-4">
            {post.likesCount && (
              <div className="cursor-default absolute bottom-auto inline-block -translate-y-1/2 translate-x-2/4 rounded-full bg-blue-600 right-3 px-2.5 py-1.5 text-xs font-bold leading-none text-white">
                {post.likesCount}
              </div>
            )}
            <button
              className={`text-blue-500 hover:text-blue-700 relative ${
                post.likesCount ? "top-2.5 " : "top-0"
              }`}
            >
              Like
            </button>
          </div>
          <div className="border-l-2"></div>
          <div className="relative inline-flex w-fit my-1 mx-4">
            {post.commentsCount && (
              <div className="cursor-default absolute bottom-auto inline-block -translate-y-1/2 translate-x-2/4 rounded-full bg-gray-600 right-8 px-2.5 py-1.5 text-xs font-bold leading-none text-white">
                {post.commentsCount}
              </div>
            )}
            <button
              className={`text-gray-500 hover:text-gray-700 relative ${
                post.commentsCount ? "top-2.5 " : "top-0"
              }`}
            >
              Comment
            </button>
          </div>
          <div className="border-l-2"></div>
          <div className="relative inline-flex w-fit my-1 mx-4">
            {post.sharesCount && (
              <div className="cursor-default absolute bottom-auto inline-block -translate-y-1/2 translate-x-2/4 rounded-full bg-red-600 right-5 px-2.5 py-1.5 text-xs font-bold leading-none text-white">
                {post.sharesCount}
              </div>
            )}
            <button
              className={`text-red-500 hover:text-red-700 relative ${
                post.sharesCount ? "top-2.5 " : "top-0"
              }`}
            >
              Share
            </button>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700 mx-4">Save</button>
      </div>
    </div>
  );
};

export default PostCard;
