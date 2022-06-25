import ApiResource from "./apiResource";

class CategoriaResource extends ApiResource{
    constructor(){
        super('/categorias/');
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

export default CategoriaResource;