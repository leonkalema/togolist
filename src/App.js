import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Oneflow from './components/Oneflow';
import Hitta from './components/Hitta';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
         <Oneflow />
 <h2>Hitta Togo List</h2>
         <Hitta />

      </div>
    );
  }
}

export default App;
