import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Context/Context';

const ProfileHeader: React.FC = () => {
  const contexts = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className='chat-container-header'>
      <div className='profile'>
        <div className='img-container'>
          <img src={contexts?.currentDog?.url} alt='user photo' />
        </div>
        <h3>{contexts?.currentDog?.name}</h3>
      </div>
      <i className='logout-icon' onClick={() => navigate('/myDogs')}>
        <ArrowCircleLeftIcon />
      </i>
    </div>
  );
};
export default ProfileHeader;
