import MatchesDisplay from './MatchesDisplay';
import ProfileHeader from './ProfileHeader';

const DogProfile = () => {
  return (
    <div className='chat-container'>
      <ProfileHeader />
      <MatchesDisplay />
    </div>
  );
};

export default DogProfile;
