import { useContext, useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import { Dog, User } from '../types/Types';
import apiService from '../services/apiservices';
import { useParams } from 'react-router';
import TinderCard from 'react-tinder-card';
import { Context } from '../Context/Context';

const Dashboard: React.FC = () => {
  const [lastDirection, setLastDirection] = useState('');
  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);
  const contexts = useContext(Context);
  const currentUser = contexts?.user;
  const currentDog = contexts?.currentDog as Dog;
  const currentDogId = contexts?.currentDog?.id as number;

  // function getUser() {
  //   apiService.getUser(parsedId).then((data) => {
  //     contexts?.updateUser(data);
  //   });
  // }

  // useEffect(() => {
  //   getUser();
  // }, []);

  //NOT USE:
  // useEffect(() => {
  //   if (user) {
  //     getAllUsers();
  //   }
  // }, [user]);

  const updateMatches = async (otherDogId: number) => {
    apiService.addMatch(currentDog, otherDogId).then((theOtherDog) => {
      if (theOtherDog.matches_dogs.includes(currentDog.id)) {
        alert('Its a maaaatch');
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

  console.log({ currentUser });
  const otherDogs = contexts?.dogs?.filter((dog) => {
    return dog?.userId !== currentUser?.id;
  });

  console.log({ otherDogs });

  return (
    <>
      {currentUser && (
        <div className='dashboard'>
          <ChatContainer user={currentUser as User} />
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
                    {/*<button onClick={() => swiped('right', dog)}>
                      IOAUSHDOUISAHDUIAD
                </button>*/}
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
