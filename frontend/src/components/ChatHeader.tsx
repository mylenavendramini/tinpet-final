/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import LogoutIcon from '@mui/icons-material/Logout';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './Context/Context';
//TODO:


const ChatHeader: React.FC = () => {
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const context = useContext(Context);
  const dogs = context?.dogs; 
  const updateDog = context?.updateDog; 
  const dogName = dogs?.map((dog) => dog.name)
  const dogUrl = dogs?.map((dog) => dog.url)


  const navigate = useNavigate();

  const logout = (): void => {
    // removeCookie('UserId', cookies.UserId);
    // removeCookie('AuthToken', cookies.Authtoken);
    navigate('/');
  };

  return (
    <div className='chat-container-header'>
      <div className='profile'>
        <div className='img-container'>
          <img src={`${dogUrl}`}  alt='user photo' />
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
