import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/images/logo.png";
import appName from "../../../assets/images/appName.png";

type Props = {};

const Register = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const regResponse = await fetch('http://localhost:8080/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          name
        }),
      });

      if (!regResponse.ok) {
        const errorData = await regResponse.json();
        alert(`Register failed: ${errorData.error}`);
        return;
      }

      const regData = await regResponse.json();
      console.log('Register successful', regData);

      const loginResponse = await fetch('http://localhost:8080/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        alert(`Auto-login failed: ${errorData.error}`);
        return;
      }

      const loginData = await loginResponse.json();
      console.log('Auto-login successful', loginData);
      
      
      // navigate('/dashboard'); 
    } catch (error) {
      console.error('An error occurred during register', error);
      alert('An error occurred during register. Please try again later.');
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 flex justify-center items-center bg-oceanBlue">
        <img src={logo} alt="Logo" className="w-1/2" />
      </div>
      <div className="flex-1 flex justify-center items-center bg-peach">
        <div className="w-full max-w-xs">
          <img src={appName} alt="AppName" className="mx-auto w-4/5" />
          <h1 className="text-2xl font-bold mt-4 text-center">Register</h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block">
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full p-2 border border-orange rounded" />
              </label>
            </div>
            <div className="mb-4">
              <label className="block">
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full p-2 border border-orange rounded" />
              </label>
            </div>
            <div className="mb-4">
              <label className="block">
                Confirm Password:
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full p-2 border border-orange rounded" />
              </label>
            </div>
            <div className="mb-4">
              <label className="block">
                Name:
                <input type="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full p-2 border border-orange rounded" />
              </label>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-orange text-white px-20 py-2 rounded-lg">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
