import ApiResource from "./apiResource";

class UsuarioResource extends ApiResource{
    constructor(){
        super('/usuarios');
    }

    login(body){
        return this.logar(body);
    }
}

export default UsuarioResource;