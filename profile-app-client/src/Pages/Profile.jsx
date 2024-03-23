import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_SERVER_URL;

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      const imageData = reader.result;

      axios
        .post(
          `${API_URL}/api/upload`,
          {
            image: imageData,
          },
          { headers: { Authorization: localStorage.getItem('token') } }
        )
        .then((response) => {
          axios
            .get(`${API_URL}/api/users`, {
              headers: { Authorization: localStorage.getItem('token') },
            })
            .then((response) => {
              console.log(response);
            });
          console.log(imageSrc, '');
        })

        .catch((err) => {
          console.log(err);
        });
    };
  };

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

  useEffect(() => {
    if (user && user.image) {
      setImageSrc(user.image);
    }
  }, [user]);
  console.log(imageSrc);

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
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload a pic</button>
          {imageSrc && (
            <div>
              <img style={{ height: '200px', width: '150px' }} src={imageSrc} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
