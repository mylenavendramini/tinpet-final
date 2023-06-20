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
  const userId = Number(contexts?.user?.id) as number;
  const navigate = useNavigate();
  // const handleClick = () => {
  //   contexts?.updateModal();
  // };
  function login(e: FormEvent) {
    e.preventDefault();
    if (!password || !email) {
      setError('Missing credentials!');
    } else {
      try {
        apiService.login(email, password).then((res) => {
          console.log(res);
          if (res.username) {
            contexts?.updateAuthenticated(true);
            contexts?.updateUser(res);
            localStorage.setItem('user', JSON.stringify(res));
            if (contexts?.myDogs && contexts?.myDogs.length > 0) navigate('/');
            else navigate(`/onboarding/${res.id}`);
          } else {
            setError('Unable to login');
          }
        });
      } catch (e) {
        setError('OMEGA LUL your login function failed');
      }
    }
  }

  return (
    <div className='overlay'>
      <div className='auth-modal'>
        <div onClick={() => navigate('/')}>
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
    </div>
  );
};
export default Login;
