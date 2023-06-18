/* eslint-disable no-unused-vars */
import Nav from '../components/Nav';
import { useState, FormEvent, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/APIServices';
import { Dog } from '../types/Types';

const Onboarding = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const parsedId = Number(id);

  const [cookies, setCookies, removeCookies] = useCookies(['user']);
  const [formData, setFormData] = useState<Dog>({
    name: '',
    age: 0,
    gender: '',
    url: '',
    about: '',
    liked_dog: [],
    matches_dogs: [],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Submited');
    apiService
      .createDog(parsedId, formData)
      .then((data) => navigate('/dashboard'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function getMyDogs() {
    apiService.getDogsofUSer(parsedId).then((data) => setMyDogs(data));
  }

  useEffect(() => {
    getMyDogs();
  }, []);

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
              value={formData.name}
              onChange={handleChange}
            />
            <label>Age</label>
            <input
              type='number'
              name='age'
              id='age'
              placeholder='Age'
              required={true}
              value={formData.age}
              onChange={handleChange}
            />
            <label>Gender</label>
            <div className='multiple-input-container'>
              <input
                id='male-gender'
                type='radio'
                name='gender'
                placeholder='Gender'
                value='male'
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />

              <label htmlFor='male-gender'>Male</label>
              <input
                id='female-gender'
                type='radio'
                name='gender'
                placeholder='Gender'
                value='female'
                checked={formData.gender === 'female'}
                onChange={handleChange}
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
              value={formData.about}
              onChange={handleChange}
            />
            <input type='submit' value='Submit' />
          </section>

          <section>
            <label htmlFor='about'>Profile Picture</label>
            <input
              id='url'
              type='url'
              name='url'
              required={true}
              onChange={handleChange}
            />
            <div className='photo-container'>
              {formData.url && <img src={formData.url} alt='profile picture' />}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
