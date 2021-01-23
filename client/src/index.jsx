import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';

// import statement to indicate you need to bundle `./index.scss`
import './index.scss';

// main component that wuill eventually all others
class MyFlixApplication extends React.Component {
  render() {
    return <MainView/>;
  }
}

// finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// tells react to render your app in DOM element root
ReactDOM.render(React.createElement(MyFlixApplication), container);