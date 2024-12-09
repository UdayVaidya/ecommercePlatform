import React, { useState, useEffect } from 'react';
import { fetchUserProfile, updateUserProfile } from '../utils/api';

const UserProfilePage = () => {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetchUserProfile()
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSave = () => {
    updateUserProfile(user)
      .then(() => alert('Profile updated successfully!'))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Your Profile</h1>
      {edit ? (
        <div>
          <label className="block mt-4">Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border p-2 w-full"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p>Email: {user.email}</p>
          <button
            onClick={() => setEdit(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
