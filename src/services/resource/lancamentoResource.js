import ApiResource from "./apiResource";

class LancamentoResource extends ApiResource{
    constructor(){
        super('/lancamentos');
    }

    listar(urlParam){
        return this.get("",`${urlParam}`);
    }

    listarValores(urlParam){
        return this.get('/valores',`${urlParam}`);
    }
}

export default LancamentoResource;