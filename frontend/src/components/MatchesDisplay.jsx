/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState([]);

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
  }, []);

  console.log(matchedProfiles);

  return (
    <div className='matches-display'>
      {matchedProfiles?.map((match, _index) => (
        <div
          key={{ _index }}
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
