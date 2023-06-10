import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const AuthModal = ({ setShowModal }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [consfirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setShowModal(false);
  };
  
  // console.log(email);
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const isSignedUp = true;

  return (
    <div className='auth-modal'>
      <div onClick={handleClick}>
        <CloseIcon className='close-icon' />
      </div>
      <h2>{isSignedUp ? 'CREATE AN ACCOUNT' : 'LOG IN'}</h2>
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

        <input
          type='password'
          id='password-check'
          name='password-check'
          placeholder='confirm'
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

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
