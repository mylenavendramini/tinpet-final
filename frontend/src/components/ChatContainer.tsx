import ChatDisplay from './ChatDisplay';
import MatchesDisplay from './MatchesDisplay';
import ChatHeader from './ChatHeader';
import { useContext, useState, useEffect } from 'react';
import { User } from '../types/Types';
import { Context } from '../Context/Context';
import apiService from '../services/APIServices';
import { Dog } from '../types/Types';


const ChatContainer = () => {
  const [clickedChat, setClickedChat] = useState(false);
  const[fetchedMatches, setFetchedMatches] = useState(false)
  const[fetchedMessages, setFetchedMessages] = useState(false)
  const context = useContext(Context);
  const myDogs = context?.myDogs;

  // useEffect(() => {
  //   apiService.getMatches(context?.currentDog?.id as number).then((res) => {
  //     context?.updateMatches(res);
  //     console.log(res, 'RESULT')
  //   });
  // }, []);

  return (
    <div className='chat-container'>
      <ChatHeader />
      <div>
        <button className='option' onClick={() => setClickedChat(false)}>
          Matches
        </button>
        <button className='option' onClick={() => setClickedChat(true)}>
          Chat
        </button>
      </div>

      {!clickedChat && (
        <MatchesDisplay />
      )}
      {clickedChat && <ChatDisplay />}
    </div>
  );
};

export default ChatContainer;

{
  /*<MatchesDisplay matches={dogsMatches} setClickedDog={setClickedDog} />*/
}
