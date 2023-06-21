import { useContext, useState } from 'react';
import { Dog } from '../types/Types';
import apiService from '../services/APIServices';
import TinderCard from 'react-tinder-card';
import { Context } from '../Context/Context';
import DogProfile from '../components/DogProfile';

const Dashboard: React.FC = () => {
  const [lastDirection, setLastDirection] = useState('');
  const contexts = useContext(Context);
  const currentUser = contexts?.user;
  const currentDog = contexts?.currentDog as Dog;

  const updateMatches = async (otherDogId: number) => {
    apiService.addMatch(currentDog, otherDogId).then((theOtherDog) => {
      if (theOtherDog.matches_dogs.includes(currentDog.id)) {
        alert('Its a maaaatch');
        contexts?.matchedDogs.push(theOtherDog);
      }
    });
  };

  const swiped = (direction: string, otherDogId: number) => {
    console.log(direction);
    if (direction == 'right') {
      updateMatches(otherDogId);
    }

    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!');
  };

  const otherDogs = contexts?.dogs?.filter((dog) => {
    return dog?.userId !== currentUser?.id;
  });

  return (
    <>
      {currentUser && (
        <div className='dashboard'>
          <DogProfile />
          <div className='swiper-container'>
            {
              <div className='card-container'>
                {otherDogs?.map((dog, idx) => (
                  <>
                    <TinderCard
                      className='swipe'
                      key={idx}
                      onSwipe={(direction) =>
                        swiped(direction, dog.id as number)
                      }
                      onCardLeftScreen={() => outOfFrame(dog.name)}
                    >
                      <div
                        style={{ backgroundImage: 'url(' + dog.url + ')' }}
                        className='card'
                        onClick={() => swiped('right', dog.id as number)}
                      >
                        <h3>
                          {dog.name + ', Age: '}
                          {dog.age}
                        </h3>
                      </div>
                    </TinderCard>
                  </>
                ))}
                <div className='swipe-info'>
                  {lastDirection && <p>You swiped {lastDirection}</p>}
                </div>
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
