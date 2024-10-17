import React from 'react'
import ModalPoa2 from './ModalPoa2'
import ModalPoaEdit2 from './ModalPoaEdit2'
import jsPDF from "jspdf";
import "jspdf-autotable";
import reporte_inventario_banner from '../../../assets/reporte_inventario_banner.png'
import encabezadoPlanificacion from '../../../assets/encabezadoPlanificacion.png'
import { EnablenumeroPoaConfig, enableCreatePoa, enableEditPoa } from '../../../ConfiguracionApp'

export default function TablaPoa({ dataPoa }) {
    console.log('poa tabla', dataPoa)

    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")



    const rowSpanMapOestra = {}
    const rowSpanMapOespe = {}
    const rowSpanMapMeta = {}

    dataPoa.forEach((item) => {
        if (rowSpanMapOestra[item.oestrategico]) {
            rowSpanMapOestra[item.oestrategico] += 1
        } else {
            rowSpanMapOestra[item.oestrategico] = 1
        }

        if (rowSpanMapOespe[item.oespecifico]) {
            rowSpanMapOespe[item.oespecifico] += 1
        } else {
            rowSpanMapOespe[item.oespecifico] = 1
        }

        if (rowSpanMapMeta[item.meta]) {
            rowSpanMapMeta[item.meta] += 1
        } else {
            rowSpanMapMeta[item.meta] = 1
        }
    })

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
        img.src = encabezadoPlanificacion;
        img.onload = function () {
            doc.addImage(this, "PNG", 10, 10, 578, 80);
            // Título centrado
            doc.setFontSize(15); // Tamaño del título
            doc.text("Reporte planificación operativa anual", doc.internal.pageSize.getWidth() / 2, 120, { align: "center" });

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
        <div>

            <button

                onClick={exportPDF}
                className="mb-4 bg-green-700 hover:bg-green-900 text-white font-semibold py px-2 rounded"
            >
                Generar pdf
            </button>


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
                    {dataPoa.map((item, index) => {
                        const isFirstOestrategico = index === 0 || dataPoa[index - 1].oestrategico !== item.oestrategico
                        const isFirstOespecifico = index === 0 || dataPoa[index - 1].oespecifico !== item.oespecifico
                        const isFirstMeta = index === 0 || dataPoa[index - 1].meta !== item.meta
                        return (
                            <tr key={index} className="border border-gray-400 text-xs px-2 text-center">
                                <td className='border border-gray-400' >{index + 1}</td>
                                {
                                    isFirstOestrategico &&
                                    <td rowSpan={rowSpanMapOestra[item.oestrategico]} className={index % 2 === 0 ? "border border-gray-400 " : "border border-gray-400"}> {item.oestrategico} </td>
                                }
                                {
                                    isFirstOespecifico &&
                                    <td rowSpan={rowSpanMapOespe[item.oespecifico]} className={index % 2 === 0 ? "border border-gray-400 " : "border border-gray-400"}> {item.oespecifico} </td>
                                }

                                {
                                    isFirstMeta &&
                                    <td rowSpan={rowSpanMapMeta[item.meta]} className={index % 2 === 0 ? "border border-gray-400 " : "border border-gray-400"}> {item.meta} </td>
                                }

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



                            </tr>
                        )
                    })}





                </tbody>




            </table>
        </div>
    )
}
