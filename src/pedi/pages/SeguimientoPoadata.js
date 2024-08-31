import React, { useState } from 'react'
import DashboardPedi from './components/DashboardPedi'
import { useGetPoaDataQuery } from '../services/pediApi'
import ModalSeguimientoPoa from './components/ModalSeguimientoPoa'
import { enableCreateSeguimiento, EnablenumeroPoaConfig } from '../../ConfiguracionApp'

import jsPDF from "jspdf";
import "jspdf-autotable";
import reporte_inventario_banner from "../../assets/reporte_inventario_banner.png";
function Verificacion(VariableMes){
    let retorno = 0
    if(VariableMes){
        retorno = VariableMes
    }
    return retorno
}
export default function SeguimientoPoadata() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const [entidadResponsable, SetEntidadResponsable] = useState('')


    const { data: dataPoa, isSuccess: isSuccessPoa } = useGetPoaDataQuery({ access: user.access, entidadResponsable: entidadResponsable })

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
                "Total año",
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
                `${Verificacion(elt.totalAnioEje)}\n${Verificacion(elt.totalAnio)}`,
                `${Verificacion(elt.eje1)}\n${Verificacion(elt.pro1)}`,
                `${Verificacion(elt.eje2)}\n${Verificacion(elt.pro2)}`,
                `${Verificacion(elt.eje3)}\n${Verificacion(elt.pro3)}`,
                `${Verificacion(elt.eje4)}\n${Verificacion(elt.pro4)}`,
                `${Verificacion(elt.eje5)}\n${Verificacion(elt.pro5)}`,
                `${Verificacion(elt.eje6)}\n${Verificacion(elt.pro6)}`,
                `${Verificacion(elt.eje7)}\n${Verificacion(elt.pro7)}`,
                `${Verificacion(elt.eje8)}\n${Verificacion(elt.pro8)}`,
                `${Verificacion(elt.eje9)}\n${Verificacion(elt.pro9)}`,
                `${Verificacion(elt.eje10)}\n${Verificacion(elt.pro10)}`,
                `${Verificacion(elt.eje11)}\n${Verificacion(elt.pro11)}`,
                `${Verificacion(elt.eje12)}\n${Verificacion(elt.pro12)}`,
                
         





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

            doc.save("ReporteSeguimientoPoa.pdf");
        };
    };

    return (
        <DashboardPedi>
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

            {isSuccessPoa ?
                <div>
                    <h1>Segumiento a la planificación operativa anual {dataPoa[0] && (dataPoa[0].anioPoa)} </h1>
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
                                    <td className="border border-gray-400 text-xs px-2">{item.responsable_sigla}</td>

                                    <td className="border border-gray-400 text-xs px-2">{item.anioPoa}</td>
                                    <td className="border border-gray-400 text-xs px-2"><div className=' border-b-2 border-gray-500 '>{item.totalAnioEje}</div> <div>{item.totalAnio}</div></td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje1}</div>   <div>{item.pro1}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '> {item.eje2} </div>  <div>{item.pro2}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje3} </div>  <div>{item.pro3}</div>  </td>
                                    <td className="border border-gray-400 text-xs px-2">  <div className=' border-b-2 border-gray-500 '>{item.eje4} </div>  <div>{item.pro4} </div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '> {item.eje5}</div>  <div> {item.pro5}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje6} </div>  <div>{item.pro6}</div>  </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje7}</div>  <div>{item.pro7}</div>  </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje8}</div>  <div>{item.pro8}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje9}</div>  <div>{item.pro9}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"><div className=' border-b-2 border-gray-500 '> {item.eje10}</div> <div>{item.pro10}</div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje11} </div>  <div>{item.pro11} </div> </td>
                                    <td className="border border-gray-400 text-xs px-2"> <div className=' border-b-2 border-gray-500 '>{item.eje12} </div>  <div>{item.pro12}</div> </td>
                                    <td>
                                        {item.coordinador_entidad == userDatos.id && enableCreateSeguimiento && EnablenumeroPoaConfig < item.numeroPoa ?

                                            <ModalSeguimientoPoa
                                                id={item.idPoa}

                                            />
                                            :
                                            <></>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                :
                <>Cargando</>
            }


        </DashboardPedi>

    )
}
