import ChatDisplay from './ChatDisplay';
import MatchesDisplay from './MatchesDisplay';
import { useState } from 'react';
import ProfileHeader from './ProfileHeader';

const DogProfile = () => {
  const [clicked, setClicked] = useState(false);
  const [fetchedMatches, setFetchedMatches] = useState(false);
  const [fetchedMessages, setFetchedMessages] = useState(false);

  return (
    <div className='chat-container'>
      <ProfileHeader />
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
