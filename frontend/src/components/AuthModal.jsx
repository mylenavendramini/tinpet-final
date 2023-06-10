import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(['user']);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  // console.log(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError('Passwords needs to match!');
        return;
      }

      const response = await axios.post('http://localhost:3000/signup', {
        email,
        password,
      });

      setCookie('Email', response.data.email);
      setCookie('User', response.data.userId);
      setCookie('Authtoken', response.data.token);

      const success = response.status === 201;

      if (success) navigate('/onboarding');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='auth-modal'>
      <div onClick={handleClick}>
        <CloseIcon className='close-icon' />
      </div>
      <h2>{isSignUp ? 'CREATE AN ACCOUNT' : 'LOG IN'}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
        voluptates minima. Amet quod aspernatur doloremque dolorum laborum est
        laudantium libero!
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='email'
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignUp && (
          <input
            type='password'
            id='password-check'
            name='password-check'
            placeholder='confirm'
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <input
          type='submit'
          className='btn-secondary'
        />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};

export default AuthModal;
