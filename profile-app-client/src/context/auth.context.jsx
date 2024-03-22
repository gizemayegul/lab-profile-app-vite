import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_SERVER_URL;

const AuthContext = createContext();

function AuthProviderWrapper(prop) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate;
  if (token) {
    localStorage.setItem('token', token);
  }
  useEffect(() => {
    const authenticatUser = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        axios
          .get(`${API_URL}/auth/verify`, {
            headers: { Authorization: `${storedToken}` },
          })
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            setUser(null);
            if (storedToken !== token) {
              localStorage.removeItem('token');
              navigate('/');
              setUser(null);
            }
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };

    authenticatUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ setToken, user, setUser }}>
      {!loading && prop.children}
      {loading && <div>loading...</div>}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
