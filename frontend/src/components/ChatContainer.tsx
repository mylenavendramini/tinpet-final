import ChatDisplay from './ChatDisplay';
import MatchesDisplay from './MatchesDisplay';
import ChatHeader from './ChatHeader';
import { useContext, useState, useEffect } from 'react';
import { User } from '../types/Types';
import { Context } from '../Context/Context';
import apiService from '../services/APIServices';
import { Dog } from '../types/Types';

interface ChatContainerProps {
  user: User;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ user }) => {
  const [clickedMatches, setClickedMatches] = useState(false);
  const [clickedChat, setClickedChat] = useState(false);
  const[fetchedMatches, setFetchedMatches] = useState(false)
  const[fetchedMessages, setFetchedMessages] = useState(false)
  const context = useContext(Context);
  const myDogs = context?.myDogs;

  useEffect(() => {
    apiService.getMatches(context?.currentDog?.id as number).then((res) => {
      context?.updateMatches(res);
      console.log(res, 'RESULT')
    });
  }, []);

  return (
    <div className='chat-container'>
      {/*TODO:*/}
      <ChatHeader />
      {/* <ChatHeader user={user} /> */}
      <div>
        <button className='option' onClick={() => setClickedMatches(true)}>
        {/* <button className='option' onClick={() => setClickedDog(null)}> */}
          Matches
        </button>
        <button className='option' onClick={() => setClickedChat(!clickedChat)}>
          Chat
        </button>
      </div>

      {clickedMatches && (
        <MatchesDisplay />
      )}

      {/* clickedDog && <ChatDisplay user={user} clickedDog={clickedDog} />*/}
      {clickedChat && <ChatDisplay />}
      {/* ChatDisplay wont need any props cause its now using Context to access the props it needs */}
    </div>
  );
};

export default ChatContainer;

{
  /*<MatchesDisplay matches={dogsMatches} setClickedDog={setClickedDog} />*/
}
