import ChatDisplay from './ChatDisplay';
import MatchesDisplay from './MatchesDisplay';
import ChatHeader from './ChatHeader';

const ChatContainer = () => {
  return (
    <div className='chat-container'>
      <ChatHeader />
      <div>
        <button className='option'>Matches</button>
        <button className='option'>Chat</button>
      </div>
      <MatchesDisplay />
      <ChatDisplay />
    </div>
  );
};

export default ChatContainer;
