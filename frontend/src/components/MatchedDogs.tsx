import { useEffect, useContext, useState } from 'react';
import apiService from '../services/APIServices';
import { Dog } from '../types/Types';
import { Context } from '../Context/Context';

function MatchedDogs() {
  const [myDog, setMyDog] = useState<Dog>();
  const contexts = useContext(Context);

  useEffect(() => {
    apiService.getDogs().then((res) => {
      // setMyDogs(res.filter((el: Dog) => {el}));
      contexts?.updateMatches(
        res.filter((el) => {
          return el.matches_dogs.includes(myDog?.id as number);
        })
      );
    });
  }, []);

  return (
    <>
      {contexts?.matchedDogs.map((el) => {
        return (
          <div key={el.id}>
            <span className='dog-name' key={el.id}>
              {el.name}
            </span>
            <img src={`${el.url}`}></img>
          </div>
        );
      })}
    </>
  );
}

export default MatchedDogs;
