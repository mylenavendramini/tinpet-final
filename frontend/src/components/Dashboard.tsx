import { useEffect, useState } from "react";
import { getDogs } from "../services/APIServices";
import { Dog } from "../types/Types";

function Dashboard () {
  const [myDogs, setMyDogs] = useState(Dog[])
  const [otherDogs, setOtherDogs] = useState([])

  useEffect(() => {
    getDogs().then((res) => {
      setMyDogs(res.filter((el:Dog):Dog[] => {

      }))
    })
  },[])
}