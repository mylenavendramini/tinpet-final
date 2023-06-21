import { useContext, useEffect, useState } from 'react';
import { Dog } from '../types/Types';
import apiService from '../services/APIServices';
import TinderCard from 'react-tinder-card';
import { Context } from '../Context/Context';
import DogProfile from '../components/DogProfile';

const Dashboard: React.FC = () => {
  const [lastDirection, setLastDirection] = useState<string | null>('');
  const [otherDogs, setOtherDogs] = useState<Dog[]>([]);
  const contexts = useContext(Context);
  const currentUser = contexts?.user;
  const currentDog = contexts?.currentDog as Dog;

  const updateMatches = async (otherDogId: number) => {
    apiService.addMatch(currentDog, otherDogId).then((theOtherDog) => {
      if (theOtherDog.matches_dogs.includes(currentDog.id)) {
        alert('Its a maaaatch');
      }
    });
  };

  const swiped = (direction: string, otherDogId: number) => {
    console.log({ otherDogId });
    setLastDirection(direction);
    const dogsLeft = otherDogs.filter((leftDog) => {
      console.log(leftDog.id);
      return leftDog.id !== otherDogId;
    });
    if (direction == 'right') {
      console.log('it was right');
      console.log({ dogsLeft });
      setOtherDogs(dogsLeft);
      updateMatches(otherDogId);
    }
  };

  const outOfFrame = (dog: Dog) => {
    console.log(dog.name + ' left the screen!');
  };

  useEffect(() => {
    const dog = localStorage.getItem('currentDog');
    const addDogs = contexts?.dogs?.filter((dog) => {
      return (
        dog?.userId !== currentUser?.id &&
        !currentDog.matches_dogs.includes(dog?.id as number) &&
        !currentDog.liked_dog.includes(dog?.id as number)
      );
    }) as Dog[];
    setOtherDogs(addDogs);
    if (dog) {
      const parsedDog = JSON.parse(dog);
      console.log(parsedDog);
      contexts?.updateCurrentDog(parsedDog);
    } else {
      console.log('You need to login first');
    }
  }, [lastDirection]);

  return (
    <>
      <div className='dashboard'>
        <DogProfile />
        <div className='swiper-container'>
          <div className='card-container'>
            {otherDogs?.map((dog, idx) => (
              <div className='card-wrapper' key={idx}>
                <TinderCard
                  className='swipe'
                  onSwipe={(direction) => swiped(direction, dog.id as number)}
                  onCardLeftScreen={() => outOfFrame(dog)}
                >
                  <div
                    style={{ backgroundImage: 'url(' + dog.url + ')' }}
                    // className={removed ? 'removed' : 'card'}
                    className='card'
                    // onClick={() => swiped('right', dog.id as number)}
                  >
                    <h3>{`${dog.name}, Age: ${dog.age}`}</h3>
                  </div>
                </TinderCard>
              </div>
            ))}
            <div className='swipe-info'>
              {lastDirection && <p>You swiped {lastDirection}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
