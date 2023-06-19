/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
  const [clickedDog, setClickedDog] = useState(null);
  const context = useContext(Context);
  const myDogs = context?.myDogs;
  const dogsMatches = myDogs?.map((dog) => dog.matches_dogs); //TODO:something tells me this will not work because MatchesDisplay is expecting an array of Dogs but will will be an
                                                              //array of numbers... - Harold
                                                              // would make more sense to use the matches in the context...
  //i think this would make more sense then map over the context.matchedDogs
  useEffect(() => {
    apiService.getMatches(context?.currentDog?.id as number).then((res) => {
      context?.updateMatches(res)
    })
  }, [])

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

      {/* {!clickedDog && (
        {/*<MatchesDisplay matches={dogsMatches} setClickedDog={setClickedDog} />*/ }
         {/*<MatchesDisplay matches={context?.matchedDogs as Dog[]} setClickedDog={context?.updateSelectedDog as Function} />*/}
      

      {/* clickedDog && <ChatDisplay user={user} clickedDog={clickedDog} />*/}
      {clickedDog && <ChatDisplay />}
      {/* ChatDisplay wont need any props cause its now using Context to access the props it needs */}
    </div>
  );
};

export default ChatContainer;
