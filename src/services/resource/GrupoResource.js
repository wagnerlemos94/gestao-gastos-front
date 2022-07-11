import ApiResource from "./apiResource";

class GrupoResource extends ApiResource{
    constructor(){
        super('/grupos/');
    }

    listar(){
        return this.get("",``);
    }

    salvar(body){
        return this.post('',body);
    }

    atualizar(id,body){
        return this.put(id,body);
    }
}

export default GrupoResource;