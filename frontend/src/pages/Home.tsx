import { useContext } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";
import React from "react";

const Home = () => {
  const contexts = useContext(Context);
  const authenticated = contexts?.authenticated;
  const navigate = useNavigate();

  return (
    <>
      <div className="overlay">
        <Nav />
        <div className="home">
          <h1 className="primary-title" data-testid="tinPet">
            TinPet
          </h1>
          <p>
            Your pet is lonely and has no friends? TinPet is the solution, here
            you can contact other people who are also looking for friends for
            their pets, where you can make friends .... among other things...
          </p>
          {authenticated ? (
            <>
              <button
                className="btn-primary"
                onClick={() => navigate("/myDogs")}
              >
                See my dogs
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-primary"
                onClick={() => navigate("/register")}
              >
                Create Account
              </button>
              <button
                className="btn-primary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
