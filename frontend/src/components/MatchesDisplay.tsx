import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '../Context/Context';
import apiService from '../services/APIServices';
import { Dog } from '../types/Types';

interface MatchesDisplayProps {
  // matches: Dog[];
  // setClickedDog: Function;
  // setClickedDog: (dog: Dog) => void;
}
const MatchesDisplay: React.FC<MatchesDisplayProps> = ({}) => {
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [matchedProfiles, setMatchedProfiles] = useState<Dog[]>([]);
  const [gotMatches, setGotMatches] = useState(false)
  const contexts = useContext(Context);
  const currentDog = contexts?.currentDog;
  const currentDogId = Number(currentDog?.id);

  const getDogMatchesIds = async () => {
    apiService
      .getMatches(currentDogId)
      .then((data) => {
        setMatchedIds(data);
      })
      .catch((error) => console.log(error));
  };

  const getDogMatches = () => {
    apiService.getDogs().then((data) => {
      const matchedDogs: Dog[] = [];
      console.log({ matchedIds });
      matchedIds.forEach((matchId) => {
        data.filter((dog) => {
          if (dog.id === matchId) matchedDogs.push(dog);
        });
      });
      setMatchedProfiles(matchedDogs);
      setGotMatches(true)
    });
  };

  useEffect(() => {
    getDogMatchesIds();
    getDogMatches();
  }, []);

  if(gotMatches) {
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
  }
};
export default MatchesDisplay;
