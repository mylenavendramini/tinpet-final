import { useContext, useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import { Dog, User } from '../types/Types';
import apiService from '../services/apiservices';
import { useParams } from 'react-router';
import TinderCard from 'react-tinder-card';
import { Context } from '../Context/Context';

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);
  const contexts = useContext(Context);
  const currentUser = contexts?.user;

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

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put('http://localhost:3000/addmatch', {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedId) => {
    if (direction === 'right') {
      updateMatches(swipedId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
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
                  <TinderCard
                    className='swipe'
                    key={idx}
                    onSwipe={(dir) => swiped(dir, dog.id)}
                    onCardLeftScreen={() => outOfFrame(dog.name)}
                  >
                    <div
                      style={{ backgroundImage: 'url(' + dog.url + ')' }}
                      className='card'
                    >
                      <h3>
                        {dog.name + ', Age: '}
                        {dog.age}
                      </h3>
                    </div>
                  </TinderCard>
                ))}
                <div className='swipe-info'>
                  {/*lastDirection ? <p>You swiped {lastDirection}</p> : <p />*/}
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
