import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>IronProfile</h1>
      <p>Today the day</p>
      <div>
        <Link to="/Signup">Signup</Link>
        {/* <Signup /> */}
      </div>
      <div>
        <Link to="/Login">Login</Link>
        {/* <Signup /> */}
      </div>
      {user && (
        <div>
          <Link to="/Profile">Profile</Link>
        </div>
      )}
    </div>
  );
}
