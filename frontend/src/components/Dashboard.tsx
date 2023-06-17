import { useEffect, useState } from 'react';
import apiService from '../services/APIServices';
import { Dog } from '../types/Types';

function Dashboard() {
  const [myDogs, setMyDogs] = useState<Dog[]>([]);
  const [otherDogs, setOtherDogs] = useState([]);

  useEffect(() => {
    apiService.getDogs().then((res) => {
      setMyDogs(res.filter((el: Dog) => {}));
    });
  }, []);
}
