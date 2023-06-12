/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ChatDisplay from './ChatDisplay';
import MatchesDisplay from './MatchesDisplay';
import ChatHeader from './ChatHeader';
import { useState } from 'react';

const ChatContainer = ({ user }) => {
  const [clickedUser, setClickedUser] = useState('');

  console.log('clickeduser', clickedUser);

  return (
    <div className='chat-container'>
      <ChatHeader user={user} />
      <div>
        <button
          className='option'
          onClick={() => setClickedUser(null)}
        >
          Matches
        </button>
        <button
          className='option'
          disabled={!clickedUser}
        >
          Chat
        </button>
      </div>
      {!clickedUser && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}
      {clickedUser && <ChatDisplay user={user} clickedUSer={clickedUser} />}
    </div>
  );
};

export default ChatContainer;
