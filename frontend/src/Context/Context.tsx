import { createContext, useState, ReactNode } from 'react';
import { Dog, User } from '../types/Types';

interface ContextType {
  user: User | null;
  dogs: Dog[] | null;
  showModal: boolean;
  isSignUp: boolean;
  updateUser: (newUser: User | null) => void;
  updateDog: (newDog: Dog[] | null) => void;
  updateModal: () => void;
  updateSignUp: () => void;
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
  return (
    <Context.Provider
      value={{
        user,
        updateUser,
        dogs,
        updateDog,
        showModal,
        updateModal,
        isSignUp,
        updateSignUp,
      }}
    >
      {children}
    </Context.Provider>
  );
};
