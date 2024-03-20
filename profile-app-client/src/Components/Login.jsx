import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      Login
      <form>
        <label htmlFor="Username">Username</label>
        <input type="text" />
        <label htmlFor="Password">Password</label>
        <input type="text" />
      </form>
      <div>
        <Link to="/signup">Create the Account</Link>
      </div>
    </div>
  );
}
