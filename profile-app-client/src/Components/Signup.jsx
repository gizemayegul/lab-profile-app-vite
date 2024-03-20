import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div>
      Signup
      <form>
        <label htmlFor="Username">Username</label>
        <input type="text" />
        <label htmlFor="Password">Password</label>
        <input type="text" />
        <label htmlFor="Campus">Campus</label>
        <input type="text" />
        <label htmlFor="Course">Course</label>
        <input type="text" />
      </form>
      <div>Hello! Awesome to see you</div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
