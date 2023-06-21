import { useContext } from 'react';
import { Context } from '../Context/Context';

const MatchesDisplay = () => {
  const contexts = useContext(Context);
  const currentDog = contexts?.currentDog;
  const matchedProfiles = contexts?.matchedDogs;

  return (
    <div className='matches-display'>
      {matchedProfiles?.map((matchProfile, idx) => (
        <div
          key={idx}
          className='match-card'
          onClick={() => contexts?.updateSelectedDog(matchProfile)}
        >
          <div className='img-container'>
            <img src={matchProfile?.url} alt='matched photo' />
          </div>
          <h3>{matchProfile?.name}</h3>
        </div>
      ))}
    </div>
  );
};
export default MatchesDisplay;
