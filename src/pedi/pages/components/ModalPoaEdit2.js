import React from 'react'
import { useState, } from 'react';
import { useGetPoaDataIDQuery, usePutPoaDataIDMutation } from '../../services/pediApi'
import { useGetDependencias_allQuery, } from '../../../general/services/generalApi'
import { AiFillEdit } from "react-icons/ai";


export default function ModalPoaEdit2({ id }) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const [updatePoa] = usePutPoaDataIDMutation()
    const { data: dataPoaID, isSuccess: isSuccessPoaID } = useGetPoaDataIDQuery({ access: user.access, id: id })
    console.log(dataPoaID)






    const [isOpen, setIsOpen] = useState(false);


    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };








    const guardarCambios = async (e) => {
        e.preventDefault()
        const pro1 = e.target.elements.pro1.value.trim()
        const pro2 = e.target.elements.pro2.value.trim()
        const pro3 = e.target.elements.pro3.value.trim()

        const pro4 = e.target.elements.pro4.value.trim()
        const pro5 = e.target.elements.pro5.value.trim()
        const pro6 = e.target.elements.pro6.value.trim()

        const pro7 = e.target.elements.pro7.value.trim()
        const pro8 = e.target.elements.pro8.value.trim()
        const pro9 = e.target.elements.pro9.value.trim()

        const pro10 = e.target.elements.pro10.value.trim()
        const pro11 = e.target.elements.pro11.value.trim()
        const pro12 = e.target.elements.pro12.value.trim()
        const totalAnio = e.target.elements.totalAnio.value.trim()


        const tempo = {
            ...dataPoaID, totalAnio: totalAnio,
            pro1: pro1,
            pro2: pro2,
            pro3: pro3,
            pro4: pro4,
            pro5: pro5,
            pro6: pro6,
            pro7: pro7,
            pro8: pro8,
            pro9: pro9,
            pro10: pro10,
            pro11: pro11,
            pro12: pro12
        }
        console.log('guarrrd', tempo)

        updatePoa({ access: user.access, id: id, rest: tempo })
        closeModal()
    };


    return (
        <>
            <button className=" rounded" onClick={openModal}>
                <AiFillEdit />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Seguimiento Planificación operativa anual</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>
                            {/* Cuerpo del modal */}


                            {/* Pie del modal */}
                            {isSuccessPoaID ?
                                <form onSubmit={guardarCambios} method='PUT'>


                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">Total :</label>
                                            <input
                                                required
                                                type="number"
                                                name="totalAnio"
                                                id="totalAnio"
                                                defaultValue={dataPoaID.totalAnio}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro1:</label>
                                            <input

                                                type="number"
                                                name="pro1"
                                                id="pro1"
                                                defaultValue={dataPoaID.pro1}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro2:</label>
                                            <input
                                                type="number"
                                                name="pro2"
                                                id="pro2"
                                                defaultValue={dataPoaID.pro2}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro3:</label>
                                            <input
                                                type="number"
                                                name="pro3"
                                                id="pro3"
                                                defaultValue={dataPoaID.pro3}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro4:</label>
                                            <input
                                                type="number"
                                                name="pro4"
                                                id="pro4"
                                                defaultValue={dataPoaID.pro4}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro5:</label>
                                            <input
                                                type="number"
                                                name="pro5"
                                                id="pro5"
                                                defaultValue={dataPoaID.pro5}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro6:</label>
                                            <input
                                                type="number"
                                                name="pro6"
                                                id="pro6"
                                                defaultValue={dataPoaID.pro6}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro7:</label>
                                            <input
                                                type="number"
                                                name="pro7"
                                                id="pro7"
                                                defaultValue={dataPoaID.pro7}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro8:</label>
                                            <input
                                                type="number"
                                                name="pro8"
                                                id="pro8"
                                                defaultValue={dataPoaID.pro8}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro9:</label>
                                            <input
                                                type="number"
                                                name="pro9"
                                                id="pro9"
                                                defaultValue={dataPoaID.pro9}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro10:</label>
                                            <input
                                                type="number"
                                                name="pro10"
                                                id="pro10"
                                                defaultValue={dataPoaID.pro10}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro11:</label>
                                            <input
                                                type="number"
                                                name="pro11"
                                                id="pro11"
                                                defaultValue={dataPoaID.pro11}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs font-bold mb-2">pro12:</label>
                                            <input
                                                type="number"
                                                name="pro12"
                                                id="pro12"
                                                defaultValue={dataPoaID.pro12}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                        >
                                            Guardar
                                        </button>

                                    </div>



                                </form>
                                :
                                <>Cargando...</>
                            }


                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>

    )
}
