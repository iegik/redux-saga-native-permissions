import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import sagaNativePermissions from 'redux-saga-native-permissions/sagas';
import sagaApp from './app/sagas';

import * as reducers from './reducers';
import App from './app/index';

const saga = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(saga)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

saga.run(sagaNativePermissions);
saga.run(sagaApp);

export default class extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}