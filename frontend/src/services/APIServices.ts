
const PORT = 'http://localhost:3000/'


// router.post('/user', createUserController);
// router.post('/dogs/:id', createDogController);
// router.get('/user/:id', getUserController);
// router.get('/dogs', getAllDogsController);
// router.get('/matches', getMatchesController);
// router.put('/dogs/:id', putLikeDogController);

const register = async (email:string, password:string) => {
  return fetch(`${PORT}/user`, {
    method: "POST",
    body: JSON.stringify({email, password}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: "include"
  }).then(res => res.json()).then(parsedRes => parsedRes)
}


const createDog = async (user_id:number, dog) => {
  return fetch(`${PORT}/dogs/${user_id}`, {
    method: "POST",
    body: JSON.stringify(dog),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: "include"
  }).then(res => res.json()).then(parsedRes => parsedRes)
}

const getUser = async (user_id:number) => {
  return fetch(`${PORT}/user/${user_id}`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: "include"
  }).then(res => res.json()).then(parsedRes => parsedRes)
}

const getDogs = async () => {
  return fetch(`${PORT}/dogs/`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: "include"
  }).then(res => res.json()).then(parsedRes => parsedRes)
}

const getMatches = async () => {
  return fetch(`${PORT}/matches`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: "include"
  }).then(res => res.json()).then(parsedRes => parsedRes)
}

const addMatch = async (id:number, dog) => {
  return fetch(`${PORT}/dogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(dog),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: "include"
  }).then(res => res.json()).then(parsedRes => parsedRes)
}

export {
  register,
  createDog,
  getUser,
  getDogs,
  getMatches,
  addMatch
}