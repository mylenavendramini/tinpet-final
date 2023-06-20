import { useEffect, useContext, useState } from 'react';
import apiService from '../services/APIServices';
import { Dog } from '../types/Types';
import { Context } from '../Context/Context';

function MatchedDogs() {
  const [myDog, setMyDog] = useState<Dog>();
  const contexts = useContext(Context);

  useEffect(() => {
    apiService.getDogs().then((res) => {
      contexts?.updateMatches(
        res.filter((el) => {
          if(el.matches_dogs.includes(myDog?.id as number)) {
            return el
          }
        })
      );
    });
  }, []);

  return (
    <>
      {contexts?.matchedDogs.map((dog) => {
        return (
          <div key={dog.id}>
            <span className='dog-name' key={dog.id}>
              {dog.name}
            </span>
            <img src={`${dog.url}`}></img>
          </div>
        );
      })}
    </>
  );
}

export default MatchedDogs;
