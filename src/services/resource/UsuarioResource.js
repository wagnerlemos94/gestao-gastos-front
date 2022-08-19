import ApiResource from "./apiResource";

class UsuarioResource extends ApiResource{
    constructor(){
        super('/usuarios');
    }

    login(body){
        return this.logar(body);
    }

    buscarPorLogin(urlParam){
        return this.get("/login/",`${urlParam}`);
    }
}

export default UsuarioResource;