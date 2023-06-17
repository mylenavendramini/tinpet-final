import { useState } from 'react';
import AuthModal from '../components/AuthModal';
import Nav from '../components/Nav';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const authToken = false;

  const handleClick = () => {
    console.log('Click!!');
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <>
      <div className='overlay'>
        <Nav />
        <div className='home'>
          <h1 className='primary-title'>TinPet</h1>
          <p>
            Your pet is lonely and has no friends? TinPet is the solution, here
            you can contact other people who are also looking for friends for
            their pets, where you can make friends .... among other things...
          </p>
          <button className='btn-primary' onClick={handleClick}>
            {authToken ? 'Sign Out' : 'Create Account'}
          </button>

          {showModal && <AuthModal />}
        </div>
      </div>
    </>
  );
};

export default Home;
