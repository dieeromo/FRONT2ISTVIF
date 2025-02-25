import React, { useState } from 'react'
import LoadingSpinner from './components/LoadingSpinner'
import DashboardBibliotecaAdmin from './components/DashboardBibliotecaAdmin'
import {
    useGetListAutoresObras_todosQuery,
    useGetListAutoresObras_filterQuery
} from '../services/bibliotecaApi'
import CargaDocumentoModal from '../components/CargaObrasModal'
import MUIDataTable from 'mui-datatables';
import CargaObrasModal from '../components/CargaObrasModal';
import { RUTA_SERVIDOR } from '../../ApiRoutes';
import { IoReaderOutline } from "react-icons/io5"
import ModalListaBiblioteca from './components/ModalListaBiblioteca'

import jsPDF from "jspdf";
import "jspdf-autotable";

import encabezadoPlanificacion from '../../assets/encabezadoBiblioteca.png'

const ListaObrasAutores = () => {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const [page, setPage] = useState(1)
    const [page_size, setPageSize] = useState(100)
    const [autor, setAutor] = useState('')
    const [obra, setObra] = useState('')

    const handleAutor = (event) => {
        setAutor(event.target.value);
    };

    const handleObra = (event) => {
        setObra(event.target.value);
    };

    const handleSize = (event) => {
        setPageSize(event.target.value);
    };


    const { data: dataObras, isLoading: isLoadingObras, isFetching: isFetchingObras } = useGetListAutoresObras_filterQuery({ access: user.access, page: page, page_size: page_size, autor: autor, obra: obra })
    console.log('data obras', dataObras)
    const exportPDF = () => {
        let dataToExport = dataObras.results

        console.log('data export', dataToExport)

        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(12);

        const headers = [
            [
                "#",
                "Autor",
                "Titulo",
                "Año",
                "Tipo",
                "Material",


            ],
        ];

        const content = {
            startY: 150,
            head: headers,
            body: dataToExport.map((elt, index) => [
                index + 1,
                elt.autor,
                elt.obra,
                elt.anio_publicacion,
                elt.tipo_obra,
                elt.tipo_material,
            ]),
            styles: { fontSize: 5 },
        };

        const img = new Image();
        img.src = encabezadoPlanificacion;
        img.onload = function () {
            doc.addImage(this, "PNG", 10, 10, 578, 80);
            // Título centrado
            doc.setFontSize(15); // Tamaño del título
            doc.text("Reporte obras biblioteca", doc.internal.pageSize.getWidth() / 2, 120, { align: "center" });

            doc.autoTable(content);

            const pageCount = doc.internal.getNumberOfPages();
            const footerText = `Generado por: ${userDatos.first_name} ${userDatos.last_name}`;
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(7);
                doc.text(
                    footerText,
                    doc.internal.pageSize.getWidth() / 2,
                    doc.internal.pageSize.getHeight() - 30,
                    { align: "center" }
                );
            }

            doc.save("ReporteBiblioteca.pdf");
        };
    };

    return (
        <DashboardBibliotecaAdmin>
            <div className='grid grid-cols-3'>
                <div className="mb-4">
                    <label className="mr-2 text-sm">Buscar por autor:</label>
                    <input
                        type="text"

                        value={autor}
                        onChange={handleAutor}
                        className="border border-neutral-700 "
                        placeholder="Ingrese el nombre"
                    />
                </div>

                <div className="mb-4">
                    <label className="mr-2 text-sm">Buscar por obra:</label>
                    <input
                        type="text"

                        value={obra}
                        onChange={handleObra}
                        className="border border-neutral-700 "
                        placeholder="Ingrese la obra"
                    />
                </div>
                <div className="mb-4">
                    <label className="mr-2 text-sm">Tamaño de pagina:</label>
                    <input
                        type="text"

                        value={page_size}
                        onChange={handleSize}
                        className="border border-neutral-700 "
                        placeholder="Ingrese el tamaño de hoja"
                    />
                </div>

                <button

                    onClick={exportPDF}
                    className="mb-2 bg-green-700 hover:bg-green-900 text-white font-semibold py px-2 rounded w-1/2"
                >
                    Generar pdf
                </button>

            </div>




            {(isFetchingObras || isLoadingObras) ?
                <LoadingSpinner />
                :
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-2 px-4 border-b text-xs text-center">#</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Autor</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Titulo</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Año</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Tipo</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Material</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Digitador</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Cargar</th>
                            <th className="py-2 px-4 border-b text-xs text-center">Eliminar</th>


                        </tr>
                    </thead>
                    <tbody>
                        {dataObras?.results.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b text-xs text-center">{index + 1}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.autor}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.obra}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.anio_publicacion}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.tipo_obra}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.tipo_material} {item.archivo && (<a href={RUTA_SERVIDOR + `/media/${item.archivo}`} target="_blank"> < IoReaderOutline className='h-5 w-5' /> </a>)}</td>
                                <td className="py-2 px-4 border-b text-xs text-center">{item.digitador_name}</td>
                                <td className="py-2 px-4 border-b text-xs text-center"> {item.id} <CargaObrasModal id={item.obra_id} /> </td>
                                <td className="py-2 px-4 border-b text-xs text-center">  <ModalListaBiblioteca id={parseInt(item.obra_id)} /> </td>




                            </tr>
                        ))}
                    </tbody>
                </table>
            }

        </DashboardBibliotecaAdmin>



    )
}
export default ListaObrasAutores