import React, { useContext } from 'react';
import { isAuthenticated } from '../auth';

import StoreContext from '../store/Context'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../../page/login';
import Lancamento from '../../page/lancamento';
import LancamentoFormulario from '../../page/lancamento/formulario';
import CategoriaFormulario from '../../page/categoria/formulario/index';
import Categoria from '../../page/categoria/index.js';

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
                    {/* <PrivateRoute exact path="/principal" component={() => <Home />} />   */}
                    <PrivateRoute exact path="/lancamentos" component={() => <Lancamento />} />  
                    <PrivateRoute exact path="/lancamentos/formulario" component={() => <LancamentoFormulario />} />  
                    <PrivateRoute exact path="/categorias/formulario" component={() => <CategoriaFormulario />} />  
                    <PrivateRoute exact path="/categorias" component={() => <Categoria />} />  
                </Switch>
            </BrowserRouter>
    );
}
export default Router;
