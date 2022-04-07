import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { inDev } from './utils/helpers';

// Application to Render
const app = <App />;

// Render application in DOM
ReactDOM.render(app, document.getElementById('app'));

// Hot module replacement
if (inDev() && module.hot) module.hot.accept();