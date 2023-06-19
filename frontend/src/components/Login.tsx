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
  const handleClick = () => {
    contexts?.updateModal();
  };
  function login(e: FormEvent) {
    e.preventDefault();
    if (!password || !email) {
      setError('Missing credentials!');
    } else {
      try {
        apiService.login(email, password).then((res) => {
          console.log(res);
          if (res.username) {
            contexts?.updateAuthenticated();
            contexts?.updateUser(res.username);
            localStorage.setItem('user', JSON.stringify(res))
            navigate('/dashboard');
          } else {
            setError('Unable to login');
          }
        });
      } catch (e) {
        console.log('OMEGA LUL your function failed');
      }
    }
  }

  return (
    <div className='auth-modal'>
      <div onClick={handleClick}>
        <CloseIcon className='close-icon' />
      </div>
      <h2>LOG IN</h2>
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
        <input type='submit' className='btn-secondary' />
      </form>
    </div>
  );
};
export default Login;
