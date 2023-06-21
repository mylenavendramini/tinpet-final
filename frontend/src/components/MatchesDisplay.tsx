import { useContext, useState } from 'react';
import { Context } from '../Context/Context';
import ChatDisplay from './ChatDisplay';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const MatchesDisplay = () => {
  const contexts = useContext(Context);
  const matchedProfiles = contexts?.matchedDogs;
  const [openChat, setOpenChat] = useState(false);
  console.log(openChat);
  return (
    <div className='matches-display'>
      {openChat ? (
        <div className='option'>
          <div className='chat-header'>
            <span onClick={() => setOpenChat(false)}>
              <ArrowCircleLeftIcon />
            </span>
            <h2> {contexts?.selectedDog?.name}</h2>
          </div>
          <ChatDisplay />
        </div>
      ) : (
        <>
          <h2 className=''>Matches</h2>
          {matchedProfiles?.map((matchProfile, idx) => (
            <div
              key={idx}
              className='match-card'
              onClick={() => contexts?.updateSelectedDog(matchProfile)}
            >
              <div
                className='img-container'
                onClick={() => setOpenChat(!openChat)}
              >
                <img src={matchProfile?.url} alt='matched photo' />
              </div>
              <h3>{matchProfile?.name}</h3>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default MatchesDisplay;
