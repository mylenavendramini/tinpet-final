import ChatDisplay from './ChatDisplay';
import MatchesDisplay from './MatchesDisplay';
import { useContext, useState } from 'react';
import { Context } from '../Context/Context';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useNavigate } from 'react-router';

const DogProfile = () => {
  const [clicked, setClicked] = useState(false);
  const [fetchedMatches, setFetchedMatches] = useState(false);
  const [fetchedMessages, setFetchedMessages] = useState(false);
  const contexts = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className='chat-container'>
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
      <div>
        <button className='option clicked' onClick={() => setClicked(true)}>
          Matches
        </button>
        <button className='option' onClick={() => setClicked(false)}>
          Chat
        </button>
      </div>
      {clicked ? <MatchesDisplay /> : <ChatDisplay />}
    </div>
  );
};

export default DogProfile;
