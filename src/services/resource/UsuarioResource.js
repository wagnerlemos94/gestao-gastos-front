import ApiResource from "./apiResource";

class UsuarioResource extends ApiResource{
    constructor(){
        super('/usuarios');
    }

    login(body){
        return this.login(body);
    }
}

export default UsuarioResource;