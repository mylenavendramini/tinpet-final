import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import { User } from '../types/Types';
import apiService from '../services/APIServices';
import { useParams } from 'react-router';
import TinderCard from 'react-tinder-card';

const Dashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    email: '',
    password: '',
    id: 0,
  });
  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);

  function getUser() {
    apiService.getUser(parsedId).then((data) => {
      setCurrentUser(data);
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  //NOT USE:
  // useEffect(() => {
  //   if (user) {
  //     getAllUsers();
  //   }
  // }, [user]);

  // const updateMatches = async (matchedUserId) => {
  //   try {
  //     await axios.put('http://localhost:3000/addmatch', {
  //       userId,
  //       matchedUserId,
  //     });
  //     getUser();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const swiped = (direction, swipedId) => {
  //   if (direction === 'right') {
  //     updateMatches(swipedId);
  //   }
  //   setLastDirection(direction);
  // };

  // const outOfFrame = (name) => {
  //   console.log(name + ' left the screen!');
  // };

  // const filteredUsers = users.filter((user) => user.id !== userId);

  return (
    <>
      {currentUser && (
        <div className='dashboard'>
          <ChatContainer user={currentUser as User} />
          <div className='swiper-container'>
            {/*
              <div className='card-container'>
                {filteredUsers.map((user) => (
                  <TinderCard
                    className='swipe'
                    key={user.user_id}
                    onSwipe={(dir) => swiped(dir, user.user_id)}
                    onCardLeftScreen={() => outOfFrame(user.name)}
                  >
                    <div
                      style={{ backgroundImage: 'url(' + user.url + ')' }}
                      className='card'
                    >
                      <h3>
                        {user.name + ', Age: '}
                        {user.age}
                      </h3>
                    </div>
                  </TinderCard>
                ))}
                <div className='swipe-info'>
                  {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                </div>
              </div>
                */}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
