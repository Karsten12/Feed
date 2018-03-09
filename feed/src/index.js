import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import App1 from './App1';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App1 />, document.getElementById('root'));
registerServiceWorker();
