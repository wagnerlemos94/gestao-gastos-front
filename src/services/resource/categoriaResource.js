import ApiResource from "./apiResource";

class CategoriaResource extends ApiResource{
    constructor(){
        super('/categorias/');
    }

    listar(){
        return this.get("",``);
    }

    listarAtivos(){
        return this.get("ativo",``);
    }

    salvar(body){
        return this.post('',body);
    }

    atualizar(id,body){
        return this.put(id,body);
    }

    atualizarStatus(urlParam){
        return this.put(`ativo${urlParam}`,"");
    }
}

export default CategoriaResource;