import { createContext, useState, ReactNode } from 'react';
import { Dog, User, Message } from '../types/Types';

interface ContextType {
  user: User | null;
  currentDog: Dog | null;
  dogs: Dog[] | null;
  showModal: boolean;
  isSignUp: boolean;
  myDogs: Dog[];
  matchedDogs: Dog[];
  authenticated: boolean;
  selectedDog:Dog | null;
  messages:Message[];
  updateUser: (newUser: User | null) => void;
  updateDog: (newDog: Dog[] | null) => void;
  updateModal: () => void;
  updateSignUp: () => void;
  updateMyDogs: (myDog: Dog[]) => void;
  updateCurrentDog: (dog: Dog | null) => void;
  updateMatches: (matchedDogs: Dog[]) => void;
  updateAuthenticated: (auth:boolean) => void;
  updateSelectedDog: (selectedDog:Dog) => void;
  updateMessages: (messages: Message[]) => void;
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
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

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
  const updateAuthenticated = (auth:boolean) => {
    setAuthenticated(auth);
  };
  const updateSelectedDog = (dog: Dog) => {
    setSelectedDog(dog)
  }
  const updateMessages = (messages:Message[]) => {
    setMessages(messages)
  }
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
        selectedDog,
        updateSelectedDog,
        messages,
        updateMessages
      }}
    >
      {children}
    </Context.Provider>
  );
};
