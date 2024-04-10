import React, { useEffect, useState } from 'react';
import DashboardVisitante from '../../pages/components/DashboardVisitante'
import {useGetListFilter_TitulosQuery} from '../services/bibliotecaApi'
import MUIDataTable from 'mui-datatables';

export default function FiltroObras() {

    const [searchOption, setSearchOption] = useState('titulo');
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const getFiltro = useGetListFilter_TitulosQuery()

    // const {data} = useGetListFilter_TitulosQuery()
    // console.log('datos',data)
    // //const tempo = getFiltro()


    const handleOptionChange = (e) => {
        setSearchOption(e.target.value);
    }

    const [inputTitulo, setInputTitulo] = useState('')
    const ManejarCambioTitulo = e => {
        setInputTitulo(e.target.value) 
    }


    const { data, error, isLoading } = useGetListFilter_TitulosQuery(inputTitulo)

     console.log(data)


    const [inputAutor, setInputAutor] = useState('')
    const manejarCambioAutor = e => {
        setInputAutor(e.target.value) 
    }

    
    const columns = [
        {
            name: 'titulo',
            label: 'titulo',
            options:{
                customBodyRender:(value, tableMeta) =>{
                    return(
                        <div>
                            <a href={`/biblioteca/presentacion/titulo/${tableMeta.rowData[3]}/`}>{value}</a>
                        </div>
                    )
                }

            }

        },
        {
            name: 'anio_publicacion',
            label: 'Año'

        },
        {
            name: 'tipo_obra',
            label: 'Tipo'
        },
        {
            name: 'id',
            label: 'id',
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'tipo_material',
            label: 'material'
        },
        
    ]

    const options = {
        selectableRows: 'none', // Deshabilita la selección en la primera fila

        titleTextStyle: {
            fontSize: '5px', // Establece el tamaño de fuente del título
        },
    };






    return (
        <DashboardVisitante>
            <div className="flex flex-col items-center mt-8 mb-4">
                <h2 className='mb-4 text-lg fond-bold'>Biblioteca ISTVIF</h2>
                <div className="flex justify-center">
                    <div className="mr-4">
                        <input
                            type="radio"
                            id="titulo"
                            name="searchOption"
                            value="titulo"
                            checked={searchOption === 'titulo'}
                            onChange={handleOptionChange}
                            className="mr-2"
                        />
                        <label htmlFor="titulo">Buscar por Título</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="autor"
                            name="searchOption"
                            value="autor"
                            checked={searchOption === 'autor'}
                            onChange={handleOptionChange}
                            className="mr-2"
                        />
                        <label htmlFor="autor">Buscar por Autor</label>
                    </div>
                </div>
                <div className="mt-4">
                    {searchOption === 'titulo' && (
                        <input
                            onChange={ManejarCambioTitulo}
                            value={inputTitulo}
                            type="text" 
                            name="titulo"
                            id='titulo'
                            placeholder="Buscar por título" className="px-4 py-2 border border-gray-300 rounded-md" />
                    )}
                    {searchOption === 'autor' && (
                        <input 
                        onChange={manejarCambioAutor}
                        value={inputAutor}
                        type="text" placeholder="Buscar por autor" className="px-4 py-2 border border-gray-300 rounded-md" />
                    )}
                </div>
            </div>


            <MUIDataTable
                title={'Obras'}
                data={data}
                columns={columns}
                options={options}
            />

        </DashboardVisitante>


    )
}