import React from "react";

const ProfileContent = ({ loggedInUser }) => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <p className="text-base">Username: {loggedInUser.username}</p>
    </div>
  );
  
  export default ProfileContent;