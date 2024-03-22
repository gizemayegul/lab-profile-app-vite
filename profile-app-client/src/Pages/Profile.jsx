import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate('');

  const removeToken = () => {
    localStorage.removeItem('token');
    navigate('/');
    setUser(null);
  };
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <div>
      {user && (
        <div>
          <h1>Profile</h1>
          <p>Username</p>
          <h3>{user.username}</h3>
          <p>Campus</p>
          <h3>{user.campus}</h3>
          <p>Course</p>
          <h3>{user.course}</h3>
          <button onClick={removeToken} style={{ color: 'red' }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
