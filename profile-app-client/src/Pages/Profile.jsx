import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

export default function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user.username);
  return (
    <div>
      <h1>Profile</h1>
      <p>Username</p>
      <h3>{user.username}</h3>
      <p>Campus</p>
      <h3>{user.campus}</h3>
      <p>Course</p>
      <h3>{user.course}</h3>
    </div>
  );
}
