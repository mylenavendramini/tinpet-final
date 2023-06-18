import Chat from './Chat';
import ChatInput from './ChatInput';
import { useState, useEffect, useContext } from 'react';
import apiService from '../services/APIServices';
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

// const userId = user?.user_id;
  // const clickedUserId = clickedUSer?.user_id;
  // const [usersMessages, setUsersMessages] = useState(null);
  // const [clickedUsersMessages, setClickedUsersMessages] = useState(null);

  // const getUsersMessages = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/messages', {
  //       params: { userId: userId, correspondingUserId: clickedUserId },
  //     });
  //     setUsersMessages(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getClickedUsersMessages = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/messages', {
  //       params: { userId: clickedUserId, correspondingUserId: userId },
  //     });
  //     setClickedUsersMessages(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getUsersMessages();
  //   getClickedUsersMessages();
  // }, []);

  // const messages = [];

  // usersMessages?.forEach((message) => {
  //   const formattedMessage = {};
  //   formattedMessage['name'] = user?.name;
  //   formattedMessage['img'] = user?.url;
  //   formattedMessage['message'] = message.message;
  //   formattedMessage['timestamp'] = message.timestamp;
  //   messages.push(formattedMessage);
  // });

  // clickedUsersMessages?.forEach((message) => {
  //   const formattedMessage = {};
  //   formattedMessage['name'] = clickedUSer?.name;
  //   formattedMessage['img'] = clickedUSer?.url;
  //   formattedMessage['message'] = message.message;
  //   formattedMessage['timestamp'] = message.timestamp;
  //   messages.push(formattedMessage);
  // });

  // const descendingOrderMessages = messages?.sort((a, b) =>
  //   a.timestamp.localeCompare(b.timestamp)
  // );

