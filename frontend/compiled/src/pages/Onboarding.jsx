"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nav_1 = __importDefault(require("../components/Nav"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const APIServices_1 = __importDefault(require("../services/APIServices"));
const Context_1 = require("../Context/Context");
const Onboarding = () => {
    const [name, setName] = (0, react_1.useState)('');
    const [age, setAge] = (0, react_1.useState)(0);
    const [gender, setGender] = (0, react_1.useState)('');
    const [url, setUrl] = (0, react_1.useState)('');
    const [about, setAbout] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const contexts = (0, react_1.useContext)(Context_1.Context);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        const newDog = {
            name,
            age,
            gender,
            url,
            about,
        };
        const userId = (_a = contexts === null || contexts === void 0 ? void 0 : contexts.user) === null || _a === void 0 ? void 0 : _a.id;
        APIServices_1.default.createDog(userId, newDog).then((dog) => {
            contexts === null || contexts === void 0 ? void 0 : contexts.myDogs.push(dog);
            contexts === null || contexts === void 0 ? void 0 : contexts.updateCurrentDog(dog);
            navigate(`/dashboard/${dog.id}`);
        });
    });
    return (<>
      <Nav_1.default />
      <div className='onboarding'>
        <h2>Create a dog</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor='first_name'>Name</label>
            <input type='text' name='name' id='name' placeholder='Name' required={true} value={name} onChange={(e) => setName(e.target.value)}/>
            <label>Age</label>
            <input type='number' name='age' id='age' placeholder='Age' required={true} value={age} onChange={(e) => {
            const dogAge = Number(e.target.value);
            setAge(dogAge);
        }}/>
            <label>Gender</label>
            <div className='multiple-input-container'>
              <input id='male-gender' type='radio' name='gender' placeholder='Gender' value='male' checked={gender === 'male'} onChange={(e) => setGender(e.target.value)}/>
              <label htmlFor='male-gender'>Male</label>
              <input id='female-gender' type='radio' name='gender' placeholder='Gender' value='female' checked={gender === 'female'} onChange={(e) => setGender(e.target.value)}/>
              <label htmlFor='female-gender'>Female</label>
            </div>

            <label htmlFor='about'>About my Pet</label>
            <input id='about' type='text' name='about' required={true} placeholder='Friendly and playful' value={about} onChange={(e) => setAbout(e.target.value)}/>
            <input type='submit' value='Submit'/>
          </section>
          <section>
            <label htmlFor='url'>Profile Picture</label>
            <input id='url' type='url' name='url' required={true} onChange={(e) => setUrl(e.target.value)}/>
            <div className='photo-container'>
              {url && <img src={url} alt='profile picture'/>}
            </div>
          </section>
        </form>
      </div>
    </>);
};
exports.default = Onboarding;
