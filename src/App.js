import React, {useState} from 'react';
import './App.css';
import logo from './logo.svg';
import Card from "./card";
import {Header} from "antd/es/layout/layout";

function App() {
    /// mapping is having issues with using a key or index seemingly so I have added it as data for now
    const [list, setList] = useState([{
        key:0,
        bodyColor:"#4F4F4F",
        titleColor: "#0E2748",
        titleSize: "36px",
        bodySize: "16px",
        title: "Custom Title",
        text: "Custom body text",}]);

    const deleteCard = (key) => {
        setList(list.filter(item => item.key !== key));
    }
    const copyCard = (data) => {
        setList([...list, {...data, key:list.length}]);
    };



  return (
    <div className="App">
      <Header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </Header>
        <div className="App-body">
            {list.map((data, key) => <Card key={key} data={data} lastCard={list.length === 1} copyCard={copyCard} deleteCard={deleteCard}/>)}
        </div>
    </div>
  );
}

export default App;
