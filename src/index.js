import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import './style/app.scss';

function render() {
  ReactDOM.render(<App claassName='app'/>, document.getElementById('root'));
}
 
render();