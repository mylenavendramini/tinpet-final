import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router';
import { Dog } from '../types/Types';
import apiService from '../services/APIServices';
import Nav from './Nav';

const MyDogs = () => {
  const [gotDogs, setGotDogs] = useState(false);
  const contexts = useContext(Context);
  const myDogs = contexts?.myDogs;
  const userId = contexts?.user?.id as number;
  const navigate = useNavigate();

  // console.log({ myDogs });
  const handleClickDog = (dog: Dog) => {
    contexts?.updateCurrentDog(dog);
    navigate(`/dashboard/${dog.id}`);
  };

  const getAllTheDogs = async () => {
    apiService.getDogsofUSer(userId).then((data) => {
      contexts?.updateMyDogs(data);
      // if (data.length > 0) {
      //   contexts?.updateCurrentDog(data[0]);
      // }
      setGotDogs(true);
    });
  };

  useEffect(() => {
    if (contexts?.authenticated) {
      getAllTheDogs();
    } else {
      console.log('no users');
    }
  }, []);

  return (
    <>
      <div className='overlay'>
        <Nav />
        <h2 id='my-dogs-title'>My dogs</h2>
        <div className='my-dogs-container'>
          {gotDogs &&
            myDogs?.map((dog) => (
              <div className='my-dog'>
                <p onClick={() => handleClickDog(dog)}>{dog.name}</p>
                <img
                  src={`${dog.url}`}
                  alt={dog.name}
                  onClick={() => handleClickDog(dog)}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default MyDogs;
