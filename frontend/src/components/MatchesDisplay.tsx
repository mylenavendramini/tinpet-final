import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../Context/Context';
interface Match {
  user_id: string;
  url: string;
  name: string;
}
interface MatchesDisplayProps {
  matches: Match[];
  setClickedUser: (user: Match) => void;
}
const MatchesDisplay: React.FC<MatchesDisplayProps> = ({
  matches,
  setClickedUser,
}) => {
  const context = useContext(Context);
  const dogs = context?.dogs;
  const updateDog = context?.updateDog;
  const dogName = dogs?.map((dog) => dog.name);
  const dogUrl = dogs?.map((dog) => dog.url);
  console.log(matches);
  const getMatches = async () => {
    const matchedUserIds = matches.map(({ user_id }) => user_id);
    try {
      const response = await axios.get('http://localhost:3000/matchedusers', {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      //TODO:
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMatches();
  }, [matches]);
  return (
    <div className='matches-display'>
      {matchedProfiles?.map((match) => (
        <div
          key={match.user_id}
          className='match-card'
          onClick={() => setClickedUser(match)}
        >
          <div className='img-container'>
            <img src={match?.url} alt='matched photo' />
          </div>
          <h3>{match?.name}</h3>
        </div>
      ))}
    </div>
  );
};
export default MatchesDisplay;
