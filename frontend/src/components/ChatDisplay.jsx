/* eslint-disable react/prop-types */
import Chat from './Chat';
import ChatInput from './ChatInput';

const ChatDisplay = ({ user, clickedUSer }) => {
  return (
    <>
      <Chat />
      <ChatInput />
    </>
  );
};

export default ChatDisplay;
