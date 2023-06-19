/* eslint-disable no-unused-vars */
import TinderCard from 'react-tinder-card';
import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [lastDirection, setLastDirection] = useState();

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user', {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        params: { userId },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getAllUsers();
    }
  }, [user]);

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


  const filteredUsers = users.filter(user => user.user_id !== userId);

  return (
    <>
      {user && (
        <div className='dashboard'>
          <ChatContainer user={user} />
          <div className='swiper-container'>
            <div className='card-container'>
              {filteredUsers.map((user) => (
                <div
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
                </div>
              ))}
              <div className='swipe-info'>
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
