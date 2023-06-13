/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);


  const getMatches = async () => {
    const matchedUserIds = matches.map(({ user_id }) => user_id);

    try {
      const response = await axios.get('http://localhost:3000/matchedusers', {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMatches();
  }, [matches]);



  return (
    <div className='matches-display'>
      {matchedProfiles?.map((match) => (
        <div
          key={match.user_id}
          className='match-card'
          onClick={() => setClickedUser(match)}
        >
          <div className='img-container'>
            <img
              src={match?.url}
              alt='matched photo'
            />
          </div>
          <h3>{match?.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
