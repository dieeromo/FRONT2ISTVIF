import React from 'react'
import DashboardServiciosAdmin from './components/DashboardServiciosAdmin'
import FormBolsaEmpleo from './components/FormBolsaEmpleo'
import { useGetBolsaEmpleo_allQuery } from '../services/generalApi'
import MUIDataTable from 'mui-datatables';

export default function BolsaEmepleoAdmin() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const { data, isSuccess } = useGetBolsaEmpleo_allQuery(user.access)
  console.log(data)
  const columns = [
    {
      name: 'institutcion',
      label: 'institucion'
    },
    {
      name: 'descripcion',
      label: 'descripcion'
    },
    {
      name: 'fecha_limite',
      label: 'fecha'
    },
    {
      name: 'url',
      label: 'url'
    },
    {
      name: 'estadoVF',
      label: 'estado'
    },
    {
      name: 'digitador_name',
      label: 'digitador'
    },
  ]
  const options = {
    selectableRows: 'none', // Deshabilita la selección en la primera fila

    titleTextStyle: {
      fontSize: '5px', // Establece el tamaño de fuente del título
    },
  };


  return (
    <DashboardServiciosAdmin>
      <div>BolsaEmepleoAdmin</div>

      <FormBolsaEmpleo />
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
    </DashboardServiciosAdmin>

  )
}
