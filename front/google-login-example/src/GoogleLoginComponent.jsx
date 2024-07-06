import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function GoogleLoginComponent() {
  const [userInfo, setUserInfo] = useState(null);

  const onSuccess = async (credentialResponse) => {
    console.log('Login Success:', credentialResponse);

    try {
      const response = await axios.post("/verify_token", {
        token: credentialResponse.credential
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Server response:', response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
    }
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
      {userInfo && (
        <div>
          <h2>User Info</h2>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <img src={userInfo.picture} alt="profile" />
        </div>
      )}
    </div>
  );
}

export default GoogleLoginComponent;
