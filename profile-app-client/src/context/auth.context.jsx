import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_SERVER_URL;

const AuthContext = createContext();

function AuthProviderWrapper(prop) {
  const [isLogged, setisLogged] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
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
            setisLogged(true);
          })
          .catch((error) => {
            setisLogged(false);
            setUser(null);
            console.log(error);
          });
      }

      // const removeToken = () => {
      //   localStorage.removeItem('token');
      // };

      // const logOutUser = () => {
      //   removeToken();
      //   authenticatUser();
      // };
    };

    authenticatUser();
  }, [token]);

  console.log(user, isLogged);

  return (
    <AuthContext.Provider value={{ setToken, user }}>
      {prop.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
