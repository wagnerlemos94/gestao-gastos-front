const ListMeses = () => {
    const meses = [
        {
            id:1,
            nome:"JANEIRO"
        },
        {
            id:2,
            nome:"FEVEREIRO"
        },
        {
            id:3,
            nome:"MARÇO"
        },
        {
            id:4,
            nome:"ABRIL"
        },
        {
            id:5,
            nome:"MAIO"
        },
        {
            id:6,
            nome:"JUNHO"
        },
        {
            id:7,
            nome:"JULHO"
        },
        {
            id:8,
            nome:"AGOSTO"
        },
        {
            id:9,
            nome:"SETEMBRO"
        },
        {
            id:10,
            nome:"OUTUBRO"
        },
        {
            id:11,
            nome:"NOVEMBRO"
        },
        {
            id:12,
            nome:"DEZEMBRO"
        }
    ];

    return{
        meses:meses
    }
}
export const getMesNome = (id) => {
    console.log(id)
    let mesSelecionado = undefined;
    ListMeses().meses.forEach( mes => {
        if(mes.id == id){
            mesSelecionado = mes.nome.toLowerCase();
        }
    });
    return mesSelecionado;
  }

export default ListMeses;