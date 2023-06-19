import CloseIcon from '@mui/icons-material/Close';
import { FormEvent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/APIServices';
import { Context } from '../Context/Context';
const AuthModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  // const [cookies, setCookies, removeCookies] = useCookies(['user']);
  // const {showModal, updateModal, isSignUp, updateSignUp} = useContext(Context)
  const contexts = useContext(Context);
  const navigate = useNavigate();
  const handleClick = () => {
    contexts?.updateModal();
  };
  function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords needs to match!');
    } else {
      try {
        apiService.register(email, password).then((res) => {
          if (res.username) {
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
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (isSignUp && password !== confirmPassword) {
  //       setError('Passwords needs to match!');
  //       return;
  //     }
  //     const response = await axios.post(
  //       `http://localhost:3000/${isSignUp ? 'signup' : 'login'}`,
  //       {
  //         email,
  //         password,
  //       }
  //     );
  //     setCookies('AuthToken', response.data.token);
  //     setCookies('UserId', response.data.userId);
  //     const success = response.status === 201;
  // if (success && isSignUp) navigate('/onboarding');
  // if (success && !isSignUp) navigate('/dashboard');
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className='auth-modal'>
      <div onClick={handleClick}>
        <CloseIcon className='close-icon' />
      </div>
      <h2>{contexts?.isSignUp ? 'CREATE AN ACCOUNT' : 'LOG IN'}</h2>
      <form onSubmit={(e) => handleRegister(e)}>
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
  );
};
export default AuthModal;
