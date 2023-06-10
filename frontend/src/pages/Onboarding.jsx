import Nav from '../components/Nav';
import { useState } from 'react';

const Onboarding = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    age: '',
    gender: '',
    email: '',
    url: '',
    about: '',
    matches: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submited');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
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
              <img
                src={formData.url}
                alt='profile picture'
              />
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
