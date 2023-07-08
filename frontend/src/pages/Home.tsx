import { useContext } from 'react';
import { useNavigate } from 'react-router';
import Nav from '../components/Nav';
import { Context } from '../Context/Context';

const Home = () => {
  const contexts = useContext(Context);
  const authenticated = contexts?.authenticated;
  const navigate = useNavigate();

  return (
    <>
      <div className='overlay'>
        <Nav />
        <div className='home'>
          <h1 className='primary-title'>TinPet</h1>
          <p>
            Discover like-minded dog lovers and find the perfect playmate for
            your friend.
          </p>
          {authenticated ? (
            <>
              <button
                className='btn-primary'
                onClick={() => navigate('/myDogs')}
              >
                See my dogs
              </button>
            </>
          ) : (
            <>
              <button
                className='btn-primary'
                onClick={() => navigate('/register')}
              >
                Create Account
              </button>
              <button
                className='btn-primary'
                onClick={() => navigate('/login')}
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
