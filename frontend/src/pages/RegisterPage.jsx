import React, { useState } from 'react';
import { register as registerAPI } from '../utils/api';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    registerAPI({ email, password })
      .then(() => alert('Registration successful!'))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Register</h1>
      <div className="mt-4">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        <label className="block mt-4 mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
