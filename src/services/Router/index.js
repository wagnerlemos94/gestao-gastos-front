import React, { useContext } from 'react';
import { isAuthenticated } from '../auth';

import StoreContext from '../store/Context'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../../page/login';
import Home from '../../page/home';
import Lancamento from '../../page/home/formulario';
import Categoria from '../../page/categoria/index';

import Navbar from '../../component/NavBar';

const PrivateRoute = ({ component: Component, ...rest }) => {

    // const { token } = useContext(StoreContext);
    const token = localStorage.getItem("token");

    return (    
        <Navbar>
            <Route {...rest} render={props => (
                isAuthenticated(token) ? (
                <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
                )} />
        </Navbar>
    );
};

const PublicRoute = ({ component: Component, ...rest }) => {

    const { token } = useContext(StoreContext);

    return (  
        <Navbar>
            <Route {...rest} render={props => (
                isAuthenticated(token) ? (                
                    <Redirect to={{ pathname: '/principal', state: { from: props.location } }} />
                ) : (
                    <Component {...props} />            
                )
            )} />
        </Navbar>
    );
};

const Router = () => {
    return(
            <BrowserRouter>
                <Switch>
                    <PublicRoute exact path="/" component={() => <Login />} />
                    <PrivateRoute exact path="/principal" component={() => <Home />} />  
                    <PrivateRoute exact path="/lancamentos/formulario" component={() => <Lancamento />} />  
                    <PrivateRoute exact path="/categoria/formulario" component={() => <Categoria />} />  
                </Switch>
            </BrowserRouter>
    );
}
export default Router;
