import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_SERVER_URL;

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [campus, setCampus] = useState('');
  const [course, setCourse] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const campusHandler = (e) => {
    setCampus(e.target.value);
  };
  const courseHandler = (e) => {
    setCourse(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
      campus,
      course,
    };

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, newUser);
      console.log(response.data);
      setUsername('');
      setPassword('');
      setCampus('');
      setCourse('');
      navigate('/login');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <div>Hello! Awesome to see you</div>
      Signup
      <form onSubmit={submitHandler}>
        <label htmlFor="Username">Username</label>
        <input
          onChange={usernameHandler}
          id="username"
          value={username}
          type="text"
        />
        <label htmlFor="Password">Password</label>
        <input
          onChange={passwordHandler}
          id="password"
          value={password}
          type="password"
        />
        <label htmlFor="Campus">Campus</label>
        {/* <select>

        </select> */}
        <input
          id="campus"
          value={campus}
          onChange={campusHandler}
          type="text"
        />
        <label htmlFor="Course">Course</label>
        <input
          id="course"
          type="text"
          onChange={courseHandler}
          value={course}
        />
        <button type="submit">Submit</button>
        <div>{error && <p>{error}</p>}</div>
      </form>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
