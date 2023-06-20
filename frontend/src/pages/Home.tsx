import { useContext } from 'react';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router';
import { Context } from '../Context/Context';

const Home = () => {
  const contexts = useContext(Context);
  const authenticated = contexts?.authenticated;
  const navigate = useNavigate();

  const handleAuth = (path: string) => {
    if (path === 'register') {
      contexts?.updateSignUp(true);
    } else if (path === 'login') {
      contexts?.updateSignUp(false);
    }
    navigate(`/${path}`);
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
          <button className='btn-primary' onClick={() => navigate('/myDogs')}>
            See my dogs
          </button>

          {!authenticated && (
            <>
              <button
                className='btn-primary'
                onClick={() => handleAuth('register')}
              >
                Create Account
              </button>
              <button
                className='btn-primary'
                onClick={() => handleAuth('login')}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
