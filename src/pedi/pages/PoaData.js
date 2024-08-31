import React, { useState } from 'react'
import DashboardPedi from './components/DashboardPedi'
import { useGetPoaDataQuery, useGetPoaDataIDQuery, usePutPoaDataIDMutation } from '../services/pediApi'
import ModalPoa from './components/ModalPoa'
import ModalPoaEdit2 from './components/ModalPoaEdit2'
import ModalPoa2 from './components/ModalPoa2'


import jsPDF from "jspdf";
import "jspdf-autotable";
import reporte_inventario_banner from "../../assets/reporte_inventario_banner.png";


import { EnablenumeroPoaConfig, enableCreatePoa, enableEditPoa } from '../../ConfiguracionApp'
function Verificacion(VariableMes){
    let retorno = 0
    if(VariableMes){
        retorno = VariableMes
    }
    return retorno
}
export default function PoaData() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const [entidadResponsable, SetEntidadResponsable] = useState('')


    const { data: dataPoa, isSuccess: isSuccessPoa } = useGetPoaDataQuery({ access: user.access, entidadResponsable: entidadResponsable })
    console.log(dataPoa)
    const handleSearch = (e) => {
        SetEntidadResponsable(e.target.value);
    };

    const exportPDF = () => {
        let dataToExport = dataPoa;



        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(12);

        const headers = [
            [
                "#",
                "Obj estr",
                "Obj espec",
                "Meta",
                "Actividad",
                "Medio verificación",
                "Indicador",
                "Toatal PEDI",
                "Resp",
                "Año",
                "En",
                "Fe",
                "Ma",
                "Ab",
                "Ma",
                "Ju",
                "Ju",
                "Ag",
                "Se",
                "Oc",
                "No",
                "Di"


            ],
        ];

        const content = {
            startY: 150,
            head: headers,
            body: dataToExport.map((elt, index) => [
                index + 1,
                elt.oestrategico_sigla,
                elt.oespecifico,
                elt.meta,
                elt.actividad,
                elt.medio,
                elt.indicadorPedi,
                elt.totalPedi,
                elt.responsable_sigla,
                elt.anioPoa,
                
                elt.pro1,
                elt.pro2,
                elt.pro3,
                elt.pro4,
                elt.pro5,
                elt.pro6,
                elt.pro7,
                elt.pro8,
                elt.pro9,
                elt.pro10,
                elt.pro11,
                elt.pro12





            ]),
            styles: { fontSize: 5 },
        };

        const img = new Image();
        img.src = reporte_inventario_banner;
        img.onload = function () {
            doc.addImage(this, "PNG", 10, 10, 578, 90);
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

            doc.save("ReportePoa.pdf");
        };
    };


    return (
        <DashboardPedi>
            <div className='flex'>


                <div className="mb-4 mr-10">
                    <input
                        type="text"
                        placeholder="Buscar por reposnable-sigla"
                        className="px-4 py-1 border rounded w-full text-xs"
                        value={entidadResponsable}
                        onChange={handleSearch}
                    />
                </div>

                <button

                    onClick={exportPDF}
                    className="mb-4 bg-green-700 hover:bg-green-900 text-white font-semibold py px-2 rounded"
                >
                    Generar pdf
                </button>

            </div>


            {isSuccessPoa ?
                <div>
                    <h1>Planificación operativa anual {dataPoa[0] && (dataPoa[0].anioPoa)}</h1>
                    <table className="shadow-md">
                        <thead >
                            <tr className="bg-lime-900 text-white text-sm  py-2 px-8 text-center">
                                <td>#</td>

                                <td>Obj. Estr</td>
                                <td>Obj. Esp</td>
                                <td>Meta</td>
                                <td>Actividad</td>
                                <td>Medio verificación</td>
                                <td>Indicador</td>
                                <td>Total Pedi</td>
                                <td>Responsable</td>
                                <td>Año</td>
                                <td>Total año</td>
                                <td>Mes 1</td>
                                <td>Mes 2</td>
                                <td>Mes 3</td>
                                <td>Mes 4</td>
                                <td>Mes 5</td>
                                <td>Mes 6</td>
                                <td>Mes 7</td>
                                <td>Mes 8</td>
                                <td>Mes 9</td>
                                <td>Mes 10</td>
                                <td>Mes 11</td>
                                <td>Mes 12</td>

                                <td></td>


                            </tr>
                        </thead>
                        {dataPoa && (
                            <tbody>


                                {dataPoa.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-200 py-1' : 'bg-gray-100 py-1'}>
                                        <td className="border border-gray-400 text-xs px-2">{index + 1}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.oestrategico_sigla}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.oespecifico}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.meta}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.actividad}</td>
                                        <td className="border border-gray-400 text-xs px-2"> {item.medio}</td>
                                        <td className="border border-gray-400 text-xs px-2"> {item.indicadorPedi}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.totalPedi}</td>
                                        <td className="border border-gray-400 text-xs px-2">
                                            <div className='grid grid-cols-2'>
                                                <div className='pr-3'>{item.responsable_sigla}</div>
                                                <div>


                                                    {EnablenumeroPoaConfig === item.numeroPoa && enableCreatePoa && item.coordinador_entidad === userDatos.id ?

                                                        <ModalPoa2
                                                            indicadorPedi={item.indicadorID}
                                                        />
                                                        :
                                                        <></>
                                                    }

                                                    {item.coordinador_entidad == userDatos.id && enableEditPoa && EnablenumeroPoaConfig < item.numeroPoa ?

                                                        <ModalPoaEdit2
                                                            dataPoaID={item}
                                                        />
                                                        :
                                                        <></>

                                                    }
                                                </div>
                                            </div>



                                        </td>

                                        <td className="border border-gray-400 text-xs px-2">{item.anioPoa}</td>
                                        <td className="border border-gray-400 text-xs px-2 font-bold">{item.totalAnio}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro1}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro2}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro3}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro4}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro5}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro6}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro7}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro8}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro9}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro10}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro11}</td>
                                        <td className="border border-gray-400 text-xs px-2">{item.pro12}</td>
                                        <td>


                                        </td>
                                    </tr>
                                ))}


                            </tbody>

                        )}



                    </table>

                </div>

                :
                <>Cargando</>
            }


        </DashboardPedi>

    )
}
