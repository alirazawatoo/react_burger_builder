import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ingredientsReducer from './Store/reducer/burgerBuilder';
import orderReducer from './Store/reducer/order';
import authReducer from './Store/reducer/auth';

const reducers = combineReducers({
	ing: ingredientsReducer,
	order: orderReducer,
	auth: authReducer
})

const logger = store => {
	return next => {
		return action => {
			console.log('Middleware Dispatch', action);
			const result = next(action);
			console.log('Middleware next state', store.getState());
			return result;
		}
	}
}

const store = createStore(reducers, applyMiddleware(logger, thunk));

ReactDOM.render(
	<Provider store={store}>
	  <React.StrictMode>
	    <BrowserRouter>
	    	<App />
	    </BrowserRouter>
	  </React.StrictMode>
	</Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
