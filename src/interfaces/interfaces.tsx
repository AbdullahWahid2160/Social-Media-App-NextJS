import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReactNode } from "react";

export interface RouterContextType {
  router: AppRouterInstance;
}

export interface RouterProviderProps {
  children: ReactNode; // Specify the type for children
}

export interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ProfileProps {
  params: { username: string };
}

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

export interface PostCardProps {
  post: FeedData; // Assuming FeedData is the type of your post data
}

export interface UserContextProps {
  userId: string;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export interface User {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  bio: string;
  website: string;
  created_at: string;
  updated_at: string;
  avatar: string;
  posts: [string];
  followers: [string];
  following: [string];
  location: string;
  date_of_birth: string;
  email: string;
  postsData: [FeedData];
}

export interface UserContentProps {
  userPosts: Array<FeedData>; // Define the props using an interface
  columns: number;
}

export interface UserInfoProps {
  user: User;
}

export interface EditedUserData {
  first_name: string;
  last_name: string;
  bio: string;
  website: string;
  // Add other properties as needed
}
