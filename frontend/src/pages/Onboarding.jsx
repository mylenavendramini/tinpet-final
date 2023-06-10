import Nav from '../components/Nav';
import { useState } from 'react';

const Onboarding = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submited');
  };

  const handleChange = () => {
    console.log('change');
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
            <label htmlFor='first_name'>First Name</label>
            <input
              type='text'
              name='first_name'
              id='first_name'
              placeholder='First Name'
              required={true}
              value={''}
              onChange={handleChange}
            />
            <label>Age</label>
            <input
              type='number'
              name='age'
              id='age'
              placeholder='Age'
              required={true}
              value={''}
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
                checked={false}
                onChange={handleChange}
              />

              <label htmlFor='male-gender'>Male</label>
              <input
                id='female-gender'
                type='radio'
                name='gender'
                placeholder='Gender'
                value='female'
                checked={false}
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
              value={''}
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
              value={''}
              onChange={handleChange}
            />
            <div className='photo-container'></div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
