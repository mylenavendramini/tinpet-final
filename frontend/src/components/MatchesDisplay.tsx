
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
const MatchesDisplay: React.FC<MatchesDisplayProps> = ({
}) => {
  const contexts = useContext(Context);
  const setClickedDog = contexts?.updateSelectedDog as Function
  const matches = contexts?.matchedDogs as Dog[]
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [matchedProfiles, setMatchedProfiles] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog>();
  const context = useContext(Context);
  const updateDog = context?.updateDog;
  const currentDog = context?.currentDog;
  const myDogs = context?.myDogs;
  const dogName = myDogs?.map((dog) => dog.name);
  const dogUrl = myDogs?.map((dog) => dog.url);
  const currentDogId = Number(currentDog?.id);

  console.log({ matches });

  const getDogMatchesIds = async () => {
    const matchesDogs = apiService
      .getMatches(currentDogId)
      .then((data) => {
        setMatchedIds(data);
      })
      .catch((error) => console.log(error));
  };

  const getDogMatches = () => {
    apiService.getDogs().then((data) => {
      console.log(data);
      // TODO:
      // get only the dogs that the id is === the ids matchedProfiles
      const matchedDogs: Dog[] = [];
      matchedIds.forEach((matchId) => {
        data.filter((dog) => {
          if (dog.id === matchId) matchedDogs.push(dog);
        });
      });
      setMatchedProfiles(matchedDogs);
    });
  };

  useEffect(() => {
    getDogMatchesIds();
    getDogMatches();
  }, [matches]);

  return (
    <div className='matches-display'>
      {matchedProfiles?.map((matchProfile, idx) => (
        <div
          key={idx}
          className='match-card'
          onClick={() => setClickedDog(matchProfile)}
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
