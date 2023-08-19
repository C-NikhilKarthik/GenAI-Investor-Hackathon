import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode"

export default function Login() {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(jwt_decode(credentialResponse.credential));
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}
