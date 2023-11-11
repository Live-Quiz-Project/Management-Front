import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
    <div>
      <header className="App-header">
        <p>Register</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <br />
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </label>
          <br />
          <label>
            Name:
            <input type="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <button type="submit">Register</button>
        </form>
      </header>
    </div>
  );
};

export default Register;
