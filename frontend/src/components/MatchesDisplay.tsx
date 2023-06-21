import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import ChatDisplay from './ChatDisplay';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Dog } from '../types/Types';

const MatchesDisplay = () => {
  const contexts = useContext(Context);
  // const matchedProfiles = contexts?.matchedDogs;
  const [matchedProfiles, setMatchedProfiles] = useState<Dog[]>([]);
  const [openChat, setOpenChat] = useState(false);
  console.log(openChat);

  useEffect(() => {
    const showMatches = contexts?.dogs?.filter((dog) => {
      return dog.matches_dogs.includes(contexts?.currentDog?.id as number);
    }) as Dog[];
    setMatchedProfiles(showMatches);
    console.log({ showMatches });
  }, []);

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
