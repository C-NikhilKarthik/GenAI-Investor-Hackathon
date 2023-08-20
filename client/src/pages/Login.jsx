import React from "react";

export default function Login() {
  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic here
    const clientId =
      "280574969621-04krb803lcqf7u38mj8vkv94bmeu3948.apps.googleusercontent.com"; //your client id
    const redirectUri = "http://localhost:3000/google/callback";
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${encodeURIComponent(
      scopes.join(" ")
    )}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&client_id=${encodeURIComponent(
      clientId
    )}&access_type=offline&prompt=consent`;

    window.location.href = authUrl;
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm md:text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <span className="flex items-center justify-center">Google</span>
      </button>
    </div>
  );
}
