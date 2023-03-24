import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ArrToTable from './components/ArrToTable';

let users = [{ id: 1, email: "john@doe.nl", password: "asdasdasdasdasd", name: "asdasdasdasdasd" }, { id: 1, email: "john@doe.nl", password: "12345", name: "asdasdasdasdasd" }, { id: 1, email: "john@doe.nl", password: "asdasdasdasdasd", name: "asdasdasdasdasd" }, { id: 1, email: "john@doe.nl", password: "asdasdasdasdasd", name: "asdasdasdasdasd" }, { id: 1, email: "john@doe.nl", password: "asdasdasdasdasd", name: "asdasdasdasdasd" }, { id: 2, email: "doe@john.nl", password: "312453454", name: "xddxxdcd" }, { id: 0, email: "abc@def.nl", password: "aaaaa", name: "abc" }, { id: 1, email: "john@doe.nl", password: "dcasfdas23", name: "gdfgdf322asdf" }]; // array of users
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ArrToTable data={users} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
