"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const APIServices_1 = require("../services/APIServices");
//TODO:
function Dashboard() {
    const [myDogs, setMyDogs] = (0, react_1.useState)(Types_1.Dog[]);
    const [otherDogs, setOtherDogs] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        (0, APIServices_1.getDogs)().then((res) => {
            setMyDogs(res.filter((el) => {
            }));
        });
    }, []);
}
