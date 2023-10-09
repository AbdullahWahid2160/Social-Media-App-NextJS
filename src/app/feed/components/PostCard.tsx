"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { useUser } from "@/app/context/userContext";
import { PostCardProps, Comment } from "@/interfaces/interfaces";
import { likeUnLikePost, postComment } from "@/services/posts";

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [sharesCount, setSharesCount] = useState(post.sharesCount);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.commentDetails); // Array to store comments
  const [showComments, setShowComments] = useState(false); // State to toggle comment section
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const { userId } = useUser();

  useEffect(() => {
    setComments(post.commentDetails);
  }, [post]);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const postCardClass = isMutating ? "opacity-70" : "opacity-100";

  const handleLikeUnLike = async (post_id: string) => {
    try {
      const response = await likeUnLikePost(post_id, userId);
      if (response) setLikesCount(response.updatedLikesCount);
    } catch (error) {
      console.error("Error while liking the post.");
    }
  };

  const handleComment = async (post_id: string) => {
    try {
      setIsFetching(true);
      const response = await postComment(post_id, userId, commentText);
      if (response) {
        setCommentsCount(response.postedCommentResult.updatedCommentsCount);
        setComments([...comments, response.postedCommentResult.commentData]);
        setShowComments(!showComments);
        setIsFetching(false);
      }
    } catch (error) {
      console.error("Error while liking the post.");
    }

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <div
      key={"key"}
      className={`bg-white rounded-lg shadow-md p-4 mb-4 ${postCardClass}`}
    >
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
            {likesCount > 0 && (
              <div className="cursor-default absolute bottom-auto inline-block -translate-y-1/2 translate-x-2/4 rounded-full bg-blue-600 right-3 px-2.5 py-1.5 text-xs font-bold leading-none text-white">
                {likesCount}
              </div>
            )}
            <button
              className={`text-blue-500 hover:text-blue-700 relative ${
                likesCount && likesCount > 0 ? "top-2.5 " : "top-0"
              }`}
              onClick={() => handleLikeUnLike(post.id)}
            >
              Like
            </button>
          </div>
          <div className="border-l-2"></div>
          <div className="relative inline-flex w-fit my-1 mx-4">
            {commentsCount > 0 && (
              <div className="cursor-default absolute bottom-auto inline-block -translate-y-1/2 translate-x-2/4 rounded-full bg-gray-600 right-8 px-2.5 py-1.5 text-xs font-bold leading-none text-white">
                {commentsCount}
              </div>
            )}
            <button
              className={`text-gray-500 hover:text-gray-700 relative ${
                commentsCount && commentsCount > 0 ? "top-2.5 " : "top-0"
              }`}
              onClick={() => setShowComments(!showComments)}
            >
              Comment
            </button>
          </div>
          <div className="border-l-2"></div>
          <div className="relative inline-flex w-fit my-1 mx-4">
            {sharesCount > 0 && (
              <div className="cursor-default absolute bottom-auto inline-block -translate-y-1/2 translate-x-2/4 rounded-full bg-red-600 right-5 px-2.5 py-1.5 text-xs font-bold leading-none text-white">
                {sharesCount}
              </div>
            )}
            <button
              className={`text-red-500 hover:text-red-700 relative ${
                sharesCount && sharesCount > 0 ? "top-2.5 " : "top-0"
              }`}
            >
              Share
            </button>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700 mx-4">Save</button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4">
          {/* Comment Input */}
          <div className="flex items-center border-t pt-4">
            <textarea
              rows={3}
              placeholder="Add a comment..."
              className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:border-blue-400"
              // value={}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              className="ml-3 bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => handleComment(post.id)}
            >
              Post
            </button>
          </div>

          {/* Display Comments */}
          {comments && (
            <div className="mt-4 space-y-2">
              {comments.map((comment, index) => (
                <div key={index} className="text-gray-600 col-span-10">
                  <strong>{comment.commenter}: </strong>
                  {comment.comment}
                  <span className="font-semibold text-gray-400 text-sm float-right">
                    {comment.created_at}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
