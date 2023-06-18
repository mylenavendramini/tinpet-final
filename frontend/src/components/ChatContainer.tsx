/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ChatDisplay from './ChatDisplay';
import MatchesDisplay from './MatchesDisplay';
import ChatHeader from './ChatHeader';
import { useContext, useState } from 'react';
import { User } from '../types/Types';
import { Context } from '../Context/Context';
import { Dog } from '../types/Types';

interface ChatContainerProps {
  user: User;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ user }) => {
  const [clickedDog, setClickedDog] = useState(null);
  const context = useContext(Context);
  const myDogs = context?.myDogs;
  const dogsMatches = myDogs?.map((dog) => dog.matches_dogs); //TODO:something tells me this will not work because MatchesDisplay is expecting an array of Dogs but will will be an
                                                              //array of numbers... - Harold
                                                              // would make more sense to use the matches in the context...

  return (
    <div className='chat-container'>
      {/*TODO:*/}
      <ChatHeader/>
      {/* <ChatHeader user={user} /> */}
      <div>
        <button className='option' onClick={() => setClickedDog(null)}>
          Matches
        </button>
        <button className='option' disabled={!clickedDog}>
          Chat
        </button>
      </div>

      {!clickedDog && (
        <MatchesDisplay matches={dogsMatches} setClickedDog={setClickedDog} />
        // <MatchesDisplay matches={dogsMatches} setClickedDog={setClickedDog} />
      )}

      {clickedDog && <ChatDisplay user={user} clickedDog={clickedDog} />}
    </div>
  );
};

export default ChatContainer;
