import supabase from '@/app/utils/supabase'; // Define your UserProfile type


// Fetch user profile data from Supabase based on the username
// async function fetchUserProfile(){
//   const { data, error } = await supabase
//     .from('profiles')
//     .select('id, username, full_name, bio, website')
//     .eq('username', username)
//     .single();

//   if (error) {
//     console.error('Error fetching user profile:', error);
//     return null;
//   }

//   return data;
// }

// // Define the page component
const UserProfilePage = () => {
//   if (!userProfile) {
//     // Handle case where user profile is not found
//     return <div>User not found</div>;
//   }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold">{"userProfile.username"}</h1>
        <p className="text-gray-600">{"userProfile.full_name"}</p>
        <p className="text-gray-600">{"userProfile.bio"}</p>
        <a
          href={"userProfile.website"}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"userProfile.website"}
        </a>
      </div>
    </div>
  );
};

export default UserProfilePage;