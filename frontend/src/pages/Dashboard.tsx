import { useContext, useEffect, useState } from 'react';
import { Dog } from '../types/Types';
import apiService from '../services/APIServices';
import TinderCard from 'react-tinder-card';
import { Context } from '../Context/Context';
import DogProfile from '../components/DogProfile';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { Snackbar, Alert, Button } from '@mui/material';

const Dashboard: React.FC = () => {
  const [lastDirection, setLastDirection] = useState<string | null>('');
  const [otherDogs, setOtherDogs] = useState<Dog[]>([]);
  const [likedMessage, setLikedMessage] = useState<boolean>(false);
  const [notLikedMessage, setNotLikedMessage] = useState<boolean>(false);
  const contexts = useContext(Context);
  const currentUser = contexts?.user;
  const currentDog = contexts?.currentDog as Dog;
  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const updateMatches = async (otherDogId: number) => {
    apiService.addMatch(currentDog, otherDogId).then((theOtherDog) => {
      if (theOtherDog.matches_dogs.includes(currentDog.id)) {
        alert('Its a maaaatch');
      }
    });
  };

  const swiped = (direction: string, otherDogId: number) => {
    setLastDirection(direction);
    const dogsLeft = otherDogs.filter((leftDog) => {
      return leftDog.id !== otherDogId;
    });
    if (direction == 'right') {
      setOpen(true);
      setNotLikedMessage(false);
      setLikedMessage(true);
      setOtherDogs(dogsLeft);
      updateMatches(otherDogId);
    } else if (direction == 'left') {
      setOpen(true);
      setLikedMessage(false);
      setNotLikedMessage(true);
      setOtherDogs(dogsLeft);
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
            <div className='message'>
              {likedMessage && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    icon={false}
                    color='error'
                    severity='warning'
                    sx={{ width: '100%' }}
                  >
                    <FavoriteIcon />
                    <span>You liked this dog</span>
                  </Alert>
                </Snackbar>
              )}
              {notLikedMessage && (
                <Snackbar
                  open={open}
                  autoHideDuration={10000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity='warning'
                    icon={false}
                    color='error'
                    sx={{ width: '100%' }}
                  >
                    <HeartBrokenIcon />
                    <span>You didn't like this dog</span>
                  </Alert>
                </Snackbar>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
