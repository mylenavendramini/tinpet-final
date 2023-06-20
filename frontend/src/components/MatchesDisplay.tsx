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
  const [allMatches, setAllMatches] = useState<Dog[]>([])
  const contexts = useContext(Context);
  const dogs = contexts?.dogs
  const currentDog = contexts?.currentDog;
  const currentDogId = Number(currentDog?.id);

  //maybe do the filter here cause this one seems
  //to be up to date and changes on time

  const getDogMatchesIds = async () => {
    const matchedProfile = [] as Dog[]
    apiService
      .getMatches(currentDogId)
      .then((data) => {
        setMatchedIds(data);
        matchedIds.forEach((dogId) => {
          dogs?.map((dog) => {
            if (dog.id === dogId) {
              matchedProfile.push(dog)
            }
          })
        })
        setMatchedProfiles([...matchedProfile])
      })
      .catch((error) => console.log(error));
  };

  // getDogMatchesIds()

  console.log(matchedProfiles, currentDogId)

  // setAllMatches(contexts?.matchedDogs as Dog[])

  // console.log(contexts?.matchedDogs, currentDog)

  // const getDogMatches = () => {
  //   apiService.getDogs().then((data) => {
  //     const matchedDogs: Dog[] = [];
  //     console.log({ matchedIds });
  //     matchedIds.forEach((matchId) => {
  //       data.filter((dog) => {
  //         if (dog.id === matchId) matchedDogs.push(dog);
  //       });
  //     });
  //     setMatchedProfiles(matchedDogs);
  //     setGotMatches(true)
  //   });
  // };


  useEffect(() => {
    getDogMatchesIds();
    // getDogMatches();
  }, []);


  return (
    <div className='matches-display'>
      {matchedProfiles.map((matchProfile, idx) => {
        return (
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
        )
      })}
    </div>
  );
};
export default MatchesDisplay;
