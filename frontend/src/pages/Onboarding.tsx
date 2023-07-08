import Nav from '../components/Nav';
import { useState, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/APIServices';
import { Context } from '../Context/Context';

const Onboarding = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [url, setUrl] = useState('');
  const [about, setAbout] = useState('');
  const navigate = useNavigate();
  const contexts = useContext(Context);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newDog = {
      name,
      age,
      gender,
      url,
      about,
      liked_dog: [],
      matches_dogs: [],
    };
    const userId = contexts?.user?.id as number;
    apiService.createDog(userId, newDog).then((dog) => {
      contexts?.myDogs.push(dog);
      contexts?.updateCurrentDog(dog);
      navigate(`/dashboard/${dog.id}`);
    });
  };

  return (
    <>
      <Nav />
      <div className='onboarding'>
        <h2>Create a dog</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor='first_name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Age</label>
            <input
              type='number'
              name='age'
              id='age'
              placeholder='Age'
              required={true}
              value={age}
              onChange={(e) => {
                const dogAge = Number(e.target.value);
                setAge(dogAge);
              }}
            />
            <label>Gender</label>
            <div className='multiple-input-container'>
              <input
                id='male-gender'
                type='radio'
                name='gender'
                placeholder='Gender'
                value='male'
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor='male-gender'>Male</label>
              <input
                id='female-gender'
                type='radio'
                name='gender'
                placeholder='Gender'
                value='female'
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor='female-gender'>Female</label>
            </div>

            <label htmlFor='about'>About my Pet</label>
            <input
              id='about'
              type='text'
              name='about'
              required={true}
              placeholder='Friendly and playful'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <input type='submit' value='Submit' />
          </section>
          <section>
            <label htmlFor='url'>Profile Picture</label>
            <input
              id='url'
              type='url'
              name='url'
              required={true}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className='photo-container'>
              {url && <img src={url} alt='profile picture' />}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
