"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const APIServices_1 = __importDefault(require("../services/APIServices"));
function Dashboard() {
    const [myDogs, setMyDogs] = (0, react_1.useState)([]);
    const [otherDogs, setOtherDogs] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        APIServices_1.default.getDogs().then((res) => {
            setMyDogs(res.filter((el) => { }));
        });
    }, []);
}
