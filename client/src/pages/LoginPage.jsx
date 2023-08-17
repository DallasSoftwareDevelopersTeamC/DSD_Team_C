import React from 'react';
import LoginWindow from '../components/Login/LoginWindow.jsx';
import WelcomeMessage from '../components/Login/WelcomeMessage.jsx';

function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginWindow />
      {/* <WelcomeMessage /> */}
    </div>
  );
}

export default LoginPage;
