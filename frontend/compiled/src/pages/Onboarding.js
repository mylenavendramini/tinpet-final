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
/* eslint-disable no-unused-vars */
const Nav_1 = __importDefault(require("../components/Nav"));
const react_1 = require("react");
const react_cookie_1 = require("react-cookie");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const Onboarding = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [cookies, setCookies, removeCookies] = (0, react_cookie_1.useCookies)(['user']);
    const [formData, setFormData] = (0, react_1.useState)({
        user_id: cookies.UserId,
        name: '',
        age: '',
        gender: '',
        url: '',
        about: '',
        matches: [],
    });
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        console.log('Submited');
        try {
            const response = yield axios_1.default.put('http://localhost:3000/user', {
                formData,
            });
            const success = response.status === 200;
            if (success)
                navigate('/dashboard');
        }
        catch (err) {
            console.log(err);
        }
    });
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    return (<>
      <Nav_1.default setShowModal={() => { }} showModal={false}/>
      <div className='onboarding'>
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor='first_name'>Name</label>
            <input type='text' name='name' id='name' placeholder='Name' required={true} value={formData.name} onChange={handleChange}/>
            <label>Age</label>
            <input type='number' name='age' id='age' placeholder='Age' required={true} value={formData.age} onChange={handleChange}/>
            <label>Gender</label>
            <div className='multiple-input-container'>
              <input id='male-gender' type='radio' name='gender' placeholder='Gender' value='male' checked={formData.gender === 'male'} onChange={handleChange}/>

              <label htmlFor='male-gender'>Male</label>
              <input id='female-gender' type='radio' name='gender' placeholder='Gender' value='female' checked={formData.gender === 'female'} onChange={handleChange}/>
              <label htmlFor='female-gender'>Female</label>
            </div>

            <label htmlFor='about'>About my Pet</label>
            <input id='about' type='text' name='about' required={true} placeholder='Friendly and playful' value={formData.about} onChange={handleChange}/>
            <input type='submit' value='Submit'/>
          </section>

          <section>
            <label htmlFor='about'>Profile Picture</label>
            <input id='url' type='url' name='url' required={true} onChange={handleChange}/>
            <div className='photo-container'>
              {formData.url && (<img src={formData.url} alt='profile picture'/>)}
            </div>
          </section>
        </form>
      </div>
    </>);
};
exports.default = Onboarding;
