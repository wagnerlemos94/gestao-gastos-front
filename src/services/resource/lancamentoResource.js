import ApiResource from "./apiResource";

class LancamentoResource extends ApiResource{
    constructor(){
        super('/lancamentos/');
    }

    heroku(){
        return this.get("heroku",``);
    }

    listar(urlParam){
        return this.get("",`${urlParam}`);
    }

    listarAgrupada(urlParam){
        return this.get("agrupados",`${urlParam}`);
    }
    listarLancamentoPorCategoria(urlParam){
        return this.get("categoria",`/${urlParam}`);
    }


    listarValores(urlParam){
        return this.get('valores',`${urlParam}`);
    }

    salvar(body){
        return this.post('',body);
    }

    atualizar(id,body){
        return this.put(id,body);
    }
}

export default LancamentoResource;