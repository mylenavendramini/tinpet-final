import { createContext, useState, ReactNode } from 'react';
import { Dog, User } from '../../types/Types';
interface ContextType {
  user: User | null;
  dogs: Dog[] | null;
  updateUser: (newUser: User | null) => void;
  updateDog: (newDog: Dog[] | null) => void;
}
interface MyProviderProps {
  children: ReactNode;
}
export const Context = createContext<ContextType | undefined>(undefined);
export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dogs, setDogs] = useState<Dog[] | null>(null);
  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };
  const updateDog = (newDog: Dog[] | null) => {
    setDogs(newDog);
  };
  return (
    <Context.Provider value={{ user, updateUser, dogs, updateDog }}>{children}</Context.Provider>
  );
};