import React from 'react'
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {

    const LoginPage = () => {
        const googleLogin = useGoogleLogin({
          onSuccess: (tokenResponse) => {
            console.log("Google Login Success", tokenResponse);
          },
          onError: () => console.log("Login Failed"),
        });


  return (
    <div>
      <button onClick={() => googleLogin()} className="form-input">
      Login with Google
    </button>
    </div>
  )
}

export default Login
