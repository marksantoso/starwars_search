import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import About from './components/sections/about';
import Main from './components/sections/main';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/" component={Main} />
                </Switch>
            </div>
        </Router>
    </Provider>, document.querySelector('.container'));
