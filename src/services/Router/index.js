import React, { useContext } from 'react';
import { isAuthenticated } from '../auth';

import StoreContext from '../store/Context'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../../page/login';
import Lancamento from '../../page/lancamento';
import LancamentoFormulario from '../../page/lancamento/formulario';
import CategoriaFormulario from '../../page/categoria/formulario/index';
import GrupoFormulario from '../../page/grupo/formulario/index';
import Categoria from '../../page/categoria/index.js';
import Dashboard from '../../page/dashboard/index';
import Grupo from '../../page/grupo/index';
import UsuarioFormulario from '../../page/usuario/formulario/index';
import Usuario from '../../page/usuario/index';

import Navbar from '../../component/NavBar';

const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const PrivateRoute = ({ component: Component, ...rest }) => {

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
                    <PrivateRoute exact path="/dashboard" component={() => <Dashboard />} />  
                    <PrivateRoute exact path="/lancamentos" component={() => <Lancamento />} />  
                    <PrivateRoute exact path="/lancamentos/formulario" component={() => <LancamentoFormulario />} />  
                    <PrivateRoute exact path="/categorias" component={() => <Categoria />} />  
                    <PrivateRoute exact path="/categorias/formulario" component={() => <CategoriaFormulario />} />  
                    <PrivateRoute exact path="/grupos" component={() => <Grupo />} /> 
                    <PrivateRoute exact path="/grupos/formulario" component={() => <GrupoFormulario />} /> 
                    {usuarioLogado?.root && <PrivateRoute exact path="/usuarios" component={() => <Usuario />} /> }
                    <PrivateRoute exact path="/usuarios/formulario" component={() => <UsuarioFormulario />} /> 
                </Switch>
            </BrowserRouter>
    );
}
export default Router;
