import ChatDisplay from './ChatDisplay';
import MatchesDisplay from './MatchesDisplay';
import { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import React from 'react'

const DogProfile = () => {
  const [fetchedMatches, setFetchedMatches] = useState(false);
  const [fetchedMessages, setFetchedMessages] = useState(false);

  return (
    <div className='chat-container'>
      <ProfileHeader />
      <MatchesDisplay />
    </div>
  );
};

export default DogProfile;