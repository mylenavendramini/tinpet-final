/* eslint-disable no-unused-vars */
import Nav from '../components/Nav';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();

  const [cookies, setCookies, removeCookies] = useCookies(['user']);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    name: '',
    age: '',
    gender: '',
    url: '',
    about: '',
    matches: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submited');
    try {
      const response = await axios.put('http://localhost:3000/user', {
        formData,
      });
      const success = response.status === 200;
      if (success) navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Nav
        setShowModal={() => {}}
        showModal={false}
      />
      <div className='onboarding'>
        <h2>CREATE ACCOUNT</h2>

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
            <input
              type='submit'
              value='Submit'
            />
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
              {formData.url && (
                <img
                  src={formData.url}
                  alt='profile picture'
                />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
