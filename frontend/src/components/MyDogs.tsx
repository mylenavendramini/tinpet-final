import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router';
import { Dog } from '../types/Types';
import apiService from '../services/APIServices';
import Nav from './Nav';

const MyDogs = () => {
  const contexts = useContext(Context);
  const myDogs = contexts?.myDogs;
  const userId = contexts?.user?.id as number;
  const navigate = useNavigate();

  const handleClickDog = (dog: Dog) => {
    contexts?.updateCurrentDog(dog);
    localStorage.setItem('currentDog', JSON.stringify(dog));
    navigate(`/dashboard/${dog.id}`);
  };

  return (
    <>
      <div className='overlay'>
        <Nav />
        <h2 id='my-dogs-title'>My dogs</h2>
        <div className='my-dogs-container'>
          {myDogs?.map((dog, idx) => (
            <div className='my-dog' key={idx}>
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
