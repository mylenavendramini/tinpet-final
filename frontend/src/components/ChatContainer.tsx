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
  const contexts = useContext(Context);
  const myDogs = contexts?.myDogs;
  // const dogsMatches = myDogs?.map((dog) => dog.matches_dogs);
  useEffect(() => {
    apiService.getMatches(contexts?.currentDog?.id as number).then((res) => {
      contexts?.updateMatches(res)
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

      {!clickedDog && (
         <MatchesDisplay />
        //  <MatchesDisplay matches={contexts?.matchedDogs as Dog[]} setClickedDog={contexts?.updateSelectedDog as Function} />
      )}

      {/* clickedDog && <ChatDisplay user={user} clickedDog={clickedDog} />*/}
      {clickedDog && <ChatDisplay />}
      {/* ChatDisplay wont need any props cause its now using Context to access the props it needs */}
    </div>
  );
};

export default ChatContainer;

{/*<MatchesDisplay matches={dogsMatches} setClickedDog={setClickedDog} />*/ }
