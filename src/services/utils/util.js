import { isExpired, decodeToken } from "react-jwt";

export const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(valor);
}

export const formatarMoedaDoble = (valor) => {
    valor = valor.replace(/[^\d]+/g,'');
    const posicaoDoPonto = Math.floor(valor.length - 2);
    return valor.substr(0,posicaoDoPonto)+"."+valor.substr(posicaoDoPonto);
}

export const expirationToken = (token) => {
    if(isExpired(localStorage.getItem('token'))){
        Deslogar()
    }
}

export const Deslogar = () => {    
    localStorage.removeItem('username');
    localStorage.removeItem('token');    
    window.location.href = "/"
}