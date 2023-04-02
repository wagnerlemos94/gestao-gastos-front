import ApiResource from "./apiResource";

class StatusLancamentoResource extends ApiResource{
    constructor(){
        super('/statusLancamento/');
    }

    listar(){
        return this.get("",``);
    }
}

export default StatusLancamentoResource;