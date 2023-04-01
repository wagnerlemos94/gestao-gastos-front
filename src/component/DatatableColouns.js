export const lancamentos = () =>{
    return [
        {
          label: 'Categoria',
          field: 'categoria',
          width: 150,
        },{
          label: "Grupo",
          field: "grupo",
          width: 270,
        },
        {
          label: 'Tipo',
          field: 'tipo',
          width: 270,
        },
        {
          label: 'Valor',
          field: 'valor',
          width: 270,
        },
        {
          label: 'Ações',
          field: 'acoes',
          width: 200,
        }
      ]
}

export const lancamentosDetalhe = () =>{
    return [
        {
          label: 'Categoria',
          field: 'categoria',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        },{
          label: "Descrição",
          field: "descricao",
          width: 270,
        },
        {
            label: "Data",
            field: "data",
            width: 270,
          },
        {
          label: 'Tipo',
          field: 'tipo',
          width: 270,
        },{
          label: "Status",
          field: "status",
          width: 270,
          color:"red"
        },
        {
          label: 'Valor',
          field: 'valor',
          width: 270,
        },
        {
          label: 'Ações',
          field: 'acoes',
          width: 200,
        }
      ]
}