/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ChatDisplay from './ChatDisplay';
import MatchesDisplay from './MatchesDisplay';
import ChatHeader from './ChatHeader';
import { useContext, useState } from 'react';
import { User } from '../types/Types';
import { Context } from '../Context/Context';

interface ChatContainerProps {
  user: User;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);
  const context = useContext(Context);
  const dogs = context?.dogs;
  const dogsMatches = dogs?.map((dog) => dog.matches_dogs);

  return (
    <div className='chat-container'>
      {/*TODO:*/}
      <ChatHeader user={user} />
      <div>
        <button className='option' onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className='option' disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {!clickedUser && (
        <MatchesDisplay matches={dogsMatches} setClickedUser={setClickedUser} />
      )}

      {clickedUser && <ChatDisplay user={user} clickedUSer={clickedUser} />}
    </div>
  );
};

export default ChatContainer;
