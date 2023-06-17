/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import LogoutIcon from '@mui/icons-material/Logout';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {Dog} from '../types/Types'
//TODO:


interface ChatHeaderProps {
dog: Dog;
}


const ChatHeader: React.FC<ChatHeaderProps> = ({ dog }) => {
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const navigate = useNavigate();

  const logout = () => {
    // removeCookie('UserId', cookies.UserId);
    // removeCookie('AuthToken', cookies.Authtoken);
    navigate('/');
  };

  return (
    <div className='chat-container-header'>
      <div className='profile'>
        <div className='img-container'>
          <img src={dog.url} alt='user photo' />
        </div>
        <h3>{dog.name}</h3>
      </div>
      <i className='logout-icon' onClick={logout}>
        <LogoutIcon />
      </i>
    </div>
  );
};

export default ChatHeader;
