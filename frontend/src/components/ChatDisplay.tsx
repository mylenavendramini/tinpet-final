import Chat from './Chat';
import ChatInput from './ChatInput';
import { useContext } from 'react';
import { Context } from '../Context/Context';

//TODO:

const ChatDisplay = () => {
  const contexts = useContext(Context);
  
  return (
    <>
      {/*<Chat descendingOrderMessages={descendingOrderMessages} />*/}
      <Chat />
      <ChatInput/>
    </>
  );
};

export default ChatDisplay;


