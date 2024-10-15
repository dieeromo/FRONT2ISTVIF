import React from 'react'

export default function TablaPedi({ dataPediData }) {

    const rowSpanMapOestra = {}
    const rowSpanMapOespe = {}
    const rowSpanMapMeta = {}


    dataPediData.forEach((item) => {
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
    return (
        <div>

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
                        <td>Total</td>
                        <td>Responsable</td>
                        <td>Año 1</td>
                        <td>Año 2</td>
                        <td>Año 3</td>
                        <td>Año 4</td>
                        <td>Año 5</td>

                        <td></td>


                    </tr>
                </thead>

                <tbody>
                    {dataPediData.map((item, index) => {
                        const isFirstOestrategico = index === 0 || dataPediData[index - 1].oestrategico !== item.oestrategico
                        const isFirstOespecifico = index === 0 || dataPediData[index - 1].oespecifico !== item.oespecifico
                        const isFirstMeta = index === 0 || dataPediData[index - 1].meta !== item.meta
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
                                <td className="border border-gray-400 text-xs px-2">{item.responsable_sigla}</td>

                                <td className="border border-gray-400 text-xs px-2">{item.anio1}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.anio2}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.anio3}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.anio4}</td>
                                <td className="border border-gray-400 text-xs px-2">{item.anio5}</td>
                            </tr>
                        )
                    })}






                </tbody>

            </table>


        </div>
    )
}
