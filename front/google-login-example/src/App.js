import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginComponent from './GoogleLoginComponent';

const CLIENT_ID = "807052214718-ktlnkpsas66of4fg4koupnhoq3s3dkie.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="App">
        <h1>Google Login Example</h1>
        <GoogleLoginComponent />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
