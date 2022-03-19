import React, { useContext } from 'react';
import { isAuthenticated } from '../auth';

import StoreContext from '../store/Context'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../../page/login';
import Home from '../../page/home';
import Formulario from '../../page/home/formulario';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { token } = useContext(StoreContext);

    return (    
        <Route {...rest} render={props => (
            isAuthenticated(token) ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
        )} />
    );
};

const PublicRoute = ({ component: Component, ...rest }) => {

    const { token } = useContext(StoreContext);

    return (    
        <Route {...rest} render={props => (
            isAuthenticated(token) ? (                
                <Redirect to={{ pathname: '/principal', state: { from: props.location } }} />
            ) : (
                <Component {...props} />            
            )
        )} />
    );
};

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <PublicRoute exact path="/" component={() => <Login />} />
                <PublicRoute exact path="/principal" component={() => <Home />} />  
                <PublicRoute exact path="/lancamentos/formulario" component={() => <Formulario />} />  
            </Switch>
        </BrowserRouter>
    );
}
export default Router;
