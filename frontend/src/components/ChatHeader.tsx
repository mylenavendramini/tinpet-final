import LogoutIcon from '@mui/icons-material/Logout';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Context/Context';

const ChatHeader: React.FC = () => {
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const contexts = useContext(Context);
  const dogs = contexts?.dogs;
  const updateDog = contexts?.updateDog;
  const dogName = dogs?.map((dog) => dog.name);
  const dogUrl = dogs?.map((dog) => dog.url);
  const navigate = useNavigate();
  const logout = (): void => {
    contexts?.updateModal();
    contexts?.updateSignUp();
    contexts?.updateAuthenticated(false);
    localStorage.clear()
    navigate('/');
  };
  return (
    <div className='chat-container-header'>
      <div className='profile'>
        <div className='img-container'>
          <img src={contexts?.currentDog?.url} alt='user photo' />
        </div>
        <h3>{dogName}</h3>
      </div>
      <i className='logout-icon' onClick={logout}>
        <LogoutIcon />
      </i>
    </div>
  );
};
export default ChatHeader;
