import { createContext, useState, ReactNode } from 'react';
import { Dog, User } from '../types/Types';

interface ContextType {
  user: User | null;
  currentDog: Dog | null;
  dogs: Dog[] | null;
  showModal: boolean;
  isSignUp: boolean;
  myDogs: Dog[];
  matchedDogs: Dog[];
  authenticated: boolean;
  updateUser: (newUser: User | null) => void;
  updateDog: (newDog: Dog[] | null) => void;
  updateModal: () => void;
  updateSignUp: () => void;
  updateMyDogs: (myDog: Dog[]) => void;
  updateCurrentDog: (dog: Dog | null) => void;
  updateMatches: (matchedDogs: Dog[]) => void;
  updateAuthenticated: () => void;
}
interface MyProviderProps {
  children: ReactNode;
}
export const Context = createContext<ContextType | undefined>(undefined);
export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dogs, setDogs] = useState<Dog[] | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [matchedDogs, setMatchedDogs] = useState<Dog[]>([]);
  const [myDogs, setMyDogs] = useState<Dog[]>([]);
  const [currentDog, setCurrentDog] = useState<Dog | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };
  const updateDog = (newDog: Dog[] | null) => {
    setDogs(newDog);
  };
  const updateModal = () => {
    setShowModal(!showModal);
  };
  const updateSignUp = () => {
    setIsSignUp(!isSignUp);
  };
  const updateMyDogs = (myDogs: Dog[]) => {
    setMyDogs(myDogs);
  };
  const updateMatches = (matchedDogs: Dog[]) => {
    setMatchedDogs(matchedDogs);
  };

  const updateCurrentDog = (dog: Dog | null) => {
    setCurrentDog(dog);
  };
  const updateAuthenticated = () => {
    setAuthenticated(!authenticated);
  };
  return (
    <Context.Provider
      value={{
        user,
        updateUser,
        dogs,
        updateDog,
        myDogs,
        updateMyDogs,
        showModal,
        updateModal,
        isSignUp,
        updateSignUp,
        matchedDogs,
        updateMatches,
        currentDog,
        updateCurrentDog,
        authenticated,
        updateAuthenticated,
      }}
    >
      {children}
    </Context.Provider>
  );
};
