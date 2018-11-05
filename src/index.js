import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import rootReducer from './reducers/root';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
    const store = createStore(
      rootReducer,
      applyMiddleware(epicMiddleware)
    );
  
    epicMiddleware.run(rootEpic);
  
    return store;
  }

const appWithProvider = (
    <Provider store={configureStore()}>
        <App />
    </Provider>
);

ReactDOM.render(appWithProvider, document.getElementById('root'));