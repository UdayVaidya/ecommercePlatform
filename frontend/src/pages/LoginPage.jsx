import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { loginUser as loginAPI } from '../utils/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    loginAPI({ email, password })
      .then((res) => {
        dispatch(login({ user: res.data.user, token: res.data.token }));
        localStorage.setItem('token', res.data.token);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Login</h1>
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
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
