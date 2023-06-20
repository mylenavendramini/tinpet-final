import CloseIcon from '@mui/icons-material/Close';
import { FormEvent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/APIServices';
import { Context } from '../Context/Context';
const AuthModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const contexts = useContext(Context);
  const navigate = useNavigate();

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords needs to match!');
    } else {
      try {
        apiService.register(username, email, password).then((res) => {
          if (res.username) {
            localStorage.setItem('user', JSON.stringify(res));
            contexts?.updateAuthenticated(true);
            contexts?.updateUser(res);
            navigate(`/onboarding/${res.id}`);
          } else {
            setError('Unable to login');
          }
        });
      } catch (e) {
        console.log('OMEGA LUL your authentication failed');
      }
    }
  }

  return (
    <div className='overlay'>
      <div className='auth-modal'>
        <div onClick={() => navigate('/')}>
          <CloseIcon className='close-icon' />
        </div>
        <h2>{contexts?.isSignUp ? 'CREATE AN ACCOUNT' : 'LOG IN'}</h2>
        <form onSubmit={(e) => handleRegister(e)}>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='username'
            required={true}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          {contexts?.isSignUp && (
            <input
              type='password'
              id='password-check'
              name='password-check'
              placeholder='confirm your password'
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input type='submit' className='btn-secondary' />
          <p>{error}</p>
        </form>
        <hr />
        <h2>GET THE APP</h2>
      </div>
    </div>
  );
};
export default AuthModal;
