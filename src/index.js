import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Redirect, Route } from 'react-router-dom';
//import Home from './home/Home';
import axios from 'axios';
import dotenv from 'dotenv';
import Parent from './parent/Parent';
import Child from './child/Child';
dotenv.config();


axios.interceptors.request.use(request => {
    console.log("request=====>", request)
    if (request.url.indexOf('/login') > -1) {
        console.log("in if++++interceptors++++++")
    }
    else {
        console.log("in else++++interceptors++++++")
        request.headers['x-access-token'] = localStorage.getItem('token');
    }
    return request;
})


ReactDOM.render((
    <HashRouter>
        <div>
            <Route path="/" exact render={() => <Redirect to="/login" />} />
            <Route path="/login" component={App} />
            {/* <PrivateRoute path="/home" component={Home} /> */}     
            <PrivateRoute path="/home" component={Parent} />     
            <PrivateRoute path="/child" component={Child} />     
        </div>
    </HashRouter>
), document.getElementById('root'));


function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('token') ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                            }}
                        />
                    )
            }
        />
    );
}


serviceWorker.unregister();
