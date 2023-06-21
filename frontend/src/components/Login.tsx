import CloseIcon from '@mui/icons-material/Close';
import { FormEvent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/APIServices';
import { Context } from '../Context/Context';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const contexts = useContext(Context);
  const navigate = useNavigate();

  function login(e: FormEvent) {
    e.preventDefault();
    if (!password || !email) {
      setError('Missing credentials!');
    } else {
      try {
        apiService.login(email, password).then((user) => {
          if (user.username) {
            contexts?.updateAuthenticated(true);
            contexts?.updateUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
          } else {
            setError('Unable to login');
          }
        });
      } catch (error) {
        console.log('Authentication failed', error);
      }
    }
  }

  return (
    <div className='overlay'>
      <div className='auth-modal'>
        <div onClick={() => navigate('/')}>
          <CloseIcon className='close-icon' />
        </div>
        <h2>Login</h2>
        <form onSubmit={(e) => login(e)}>
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
          {error}
          <input type='submit' className='btn-secondary' />
        </form>
      </div>
    </div>
  );
};
export default Login;
