import { Link } from 'react-router-dom';

export default function Home() {
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
    </div>
  );
}
