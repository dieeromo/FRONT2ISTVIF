import React, { useEffect } from 'react'
import { numeroPoaConfig, anioPoaConfig } from '../../../ConfiguracionApp'
import { useCreatePoa2Mutation, useGetIndicadorPediIDQuery, usePutIndicadorPediIDMutation } from '../../services/pediApi'

import { useState, } from 'react';

function VerEjec(ejecu) {
    let ejecutado = 0
    if (ejecu) {

        ejecutado = ejecu
    }
    return ejecutado
}

export default function ModalPoa2({ indicadorPedi }) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const { data: dataIndicador, isSuccess: isSuccessIndicador } = useGetIndicadorPediIDQuery({ access: user.access, id: indicadorPedi })


    const [mes1, setMes1] = useState();
    const [mes2, setMes2] = useState();
    const [mes3, setMes3] = useState();
    const [mes4, setMes4] = useState();
    const [mes5, setMes5] = useState();
    const [mes6, setMes6] = useState();
    const [mes7, setMes7] = useState();
    const [mes8, setMes8] = useState();
    const [mes9, setMes9] = useState();
    const [mes10, setMes10] = useState();
    const [mes11, setMes11] = useState();
    const [mes12, setMes12] = useState();
    const [totalAnio, setTotalAnio] = useState(0);

    const handleInputChange = (e, setter) => {
        setter(Number(e.target.value));
    };


    useEffect(() => {
        setTotalAnio(VerEjec(mes1) + VerEjec(mes2) + VerEjec(mes3) + VerEjec(mes4) + VerEjec(mes5) + VerEjec(mes6) + VerEjec(mes7) + VerEjec(mes8) + VerEjec(mes9) + VerEjec(mes10) + VerEjec(mes11) + VerEjec(mes12));
    }, [mes1, mes2, mes3, mes4, mes5, mes6, mes7, mes8, mes9, mes10, mes11, mes12]);

    const [createPoa, { data, isSuccess }] = useCreatePoa2Mutation()
    const [updateIndicadr] = usePutIndicadorPediIDMutation()

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };



    const closeModal = (e) => {
        setIsOpen(false)
    };


    const guardarCambios = async (e) => {
        e.preventDefault()

        const tempo = {
            indicadorPedi: indicadorPedi,
            anio: anioPoaConfig,
            totalAnio: totalAnio,
            pro1: mes1,
            pro2: mes2,
            pro3: mes3,
            pro4: mes4,
            pro5: mes5,
            pro6: mes6,
            pro7: mes7,
            pro8: mes8,
            pro9: mes9,
            pro10: mes10,
            pro11: mes11,
            pro12: mes12,
            observacion: '',
            digitador: userDatos.id,
        }

        //createPoa({access:user.access, rest:   tempo })
        try {
            const tempoIndicador = {
                ...dataIndicador, numeroPoa: numeroPoaConfig
            }

            const poaCreado = await createPoa({ access: user.access, rest: tempo }).unwrap()


            const indicadorActualizado = await updateIndicadr({ access: user.access, id: indicadorPedi, rest: tempoIndicador }).unwrap()

        } catch (error) {
            console.log('error')
        }

        closeModal()

    }

    return (
        <>
            <button className="bg-green-300 hover:bg-green-400  font-bold text-sm px-1 rounded" onClick={openModal}>
                +
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Registro planificación operativa anual: </h3>
                                <div className="text-lg text-gray-600 ml-3">
                                    {isSuccessIndicador && (dataIndicador.nombre)}
                                </div>



                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>



                            <form onSubmit={guardarCambios} method='PUT'>


                                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                                    <div className="mb-4 mr-1">
                                        <label className="block text-sm font-bold mb-2">Total :</label>
                                        <div className='text-center text-sm bg-gray-200 mx-1 p-1 rounded'>{totalAnio}</div>


                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs mb-2">Pro enero:</label>
                                        <input

                                            type="number"
                                            name="pro1"
                                            required
                                            value={mes1}
                                            onChange={(e) => handleInputChange(e, setMes1)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs  mb-2">Pro febrero:</label>
                                        <input
                                            type="number"
                                            name="pro2"
                                            value={mes2}
                                            onChange={(e) => handleInputChange(e, setMes2)}
                                            required
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs mb-2">Pro marzo:</label>
                                        <input
                                            type="number"
                                            name="pro3"
                                            value={mes3}
                                            required
                                            onChange={(e) => handleInputChange(e, setMes3)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs mb-2">Pro abril:</label>
                                        <input
                                            type="number"
                                            name="pro4"
                                            id="pro4"
                                            value={mes4}
                                            required
                                            onChange={(e) => handleInputChange(e, setMes4)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs mb-2">Pro mayo:</label>
                                        <input
                                            type="number"
                                            name="pro5"
                                            id="pro5"
                                            value={mes5}
                                            required
                                            onChange={(e) => handleInputChange(e, setMes5)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs  mb-2">Pro junio:</label>
                                        <input
                                            type="number"
                                            name="pro6"
                                            id="pro6"
                                            value={mes6}
                                            required
                                            onChange={(e) => handleInputChange(e, setMes6)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs mb-2">Pro julio:</label>
                                        <input
                                            type="number"
                                            name="pro7"
                                            id="pro7"
                                            value={mes7}
                                            required
                                            onChange={(e) => handleInputChange(e, setMes7)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs mb-2">Pro agosto:</label>
                                        <input
                                            type="number"
                                            name="pro8"
                                            id="pro8"
                                            value={mes8}
                                            required
                                            onChange={(e) => handleInputChange(e, setMes8)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs  mb-2">Pro septiembre:</label>
                                        <input
                                            type="number"
                                            name="pro9"
                                            id="pro9"
                                            value={mes9}
                                            required
                                            onChange={(e) => handleInputChange(e, setMes9)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs mb-2">Pro octubre:</label>
                                        <input
                                            type="number"
                                            name="pro10"
                                            id="pro10"
                                            value={mes10}
                                            required
                                            onChange={(e) => handleInputChange(e, setMes10)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs mb-2">Pro noviembre:</label>
                                        <input
                                            type="number"
                                            name="pro11"
                                            id="pro11"
                                            value={mes11}
                                            required
                                            onChange={(e) => handleInputChange(e, setMes11)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs mb-2">Pro diciembre:</label>
                                        <input
                                            type="number"
                                            name="pro12"
                                            id="pro12"
                                            value={mes12}
                                            required
                                            onChange={(e) => handleInputChange(e, setMes12)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 mb-5"
                                    >
                                        Guardar
                                    </button>

                                </div>



                            </form>

                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
