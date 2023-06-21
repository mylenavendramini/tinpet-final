import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router';
import { Dog } from '../types/Types';
import apiService from '../services/APIServices';
import Nav from './Nav';
import React from 'react'

const MyDogs = () => {
  const [gotDogs, setGotDogs] = useState(false);
  const contexts = useContext(Context);
  const myDogs = contexts?.myDogs;
  const userId = contexts?.user?.id as number;
  const navigate = useNavigate();

  console.log({ myDogs });
  const handleClickDog = (dog: Dog) => {
    contexts?.updateCurrentDog(dog);
    navigate(`/dashboard/${dog.id}`);
  };

  console.log({ myDogs });

  return (
    <>
      <div className='overlay'>
        <Nav />
        <h2 id='my-dogs-title'>My dogs</h2>
        <div className='my-dogs-container'>
          {myDogs?.map((dog) => (
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
