/* eslint-disable no-unused-vars */
import Nav from '../components/Nav';
import { useState, FormEvent, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/APIServices';
import { Dog } from '../types/Types';
import { Context } from '../Context/Context';

const Onboarding = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const parsedId = Number(id);
  const contexts = useContext(Context);

  const [cookies, setCookies, removeCookies] = useCookies(['user']);
  // const [formData, setFormData] = useState<Dog>({
  //   name: '',
  //   age: 0,
  //   gender: '',
  //   url: '',
  //   about: '',
  //   liked_dog: [],
  //   matches_dogs: [],
  // });
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [url, setUrl] = useState('');
  const [about, setAbout] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitted');
    const newDog = {
      name,
      age,
      gender,
      url,
      about,
      liked_dog: [],
      matches_dogs: [],
    };
    // console.log({ newDog });
    const id = contexts?.user?.id as number
    console.log(id);
    console.log(contexts?.user);
    apiService
      .createDog(id , newDog)
      // .createDog(contexts?.user, newDog)
      .then((data) => {
        console.log(data)
        navigate('/dashboard')});
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e?.target.value;
  //   const name = e.target.name;
  //   setName();

  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  function getMyDogs() {
    apiService
      .getDogsofUSer(parsedId)
      .then((data) => contexts?.updateMyDogs(data));
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
