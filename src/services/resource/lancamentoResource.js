import ApiResource from "./apiResource";

class LancamentoResource extends ApiResource{
    constructor(){
        super('/lancamentos');
    }

    listar(urlParam){
        return this.get(`${urlParam}`);
    }
}

export default LancamentoResource;