import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_SERVER_URL;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate('');
  const [error, setError] = useState('');
  const usernameHandler = (e) => setUsername(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    const loginUser = {
      username,
      password,
    };

    try {
      const response = await axios.post(`${API_URL}/auth/login`, loginUser);
      setUsername('');
      setPassword('');
      setToken(response.data.token);
      navigate('/');

      console.log(token);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      Login
      <form onSubmit={submitHandler}>
        <label htmlFor="Username">Username</label>
        <input value={username} type="text" onChange={usernameHandler} />
        <label htmlFor="Password">Password</label>
        <input value={password} type="password" onChange={passwordHandler} />
        <button type="submit">Login</button>
      </form>
      <div>
        <Link to="/signup">Create the Account</Link>
      </div>
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
}
