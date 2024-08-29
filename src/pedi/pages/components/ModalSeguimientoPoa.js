import React from 'react'
import { useState, } from 'react';
import { useGetPoaDataIDQuery, usePutPoaDataIDMutation } from '../../services/pediApi'
import { useGetDependencias_allQuery, } from '../../../general/services/generalApi'
import { AiFillEdit } from "react-icons/ai";
import { enableSeguimientoPoa } from '../../../ConfiguracionApp'

function VerEjec(ejecu){
    let ejecutado = 0
    if (ejecu){

        ejecutado = ejecu
    }
    return ejecutado
}
export default function ModalSeguimientoPoa({ id }) {

    const user = JSON.parse(localStorage.getItem('user') || "{}")

    const [updatePoa] = usePutPoaDataIDMutation()
    const { data: dataPoaID, isSuccess: isSuccessPoaID } = useGetPoaDataIDQuery({ access: user.access, id: id })







    const [isOpen, setIsOpen] = useState(false);


    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        //updDocumento([user.access,id, documento])
        setIsOpen(false)
    };








    const guardarCambios = async (e) => {
        e.preventDefault()
        const eje1 = parseInt( e.target.elements.eje1.value.trim())
        const eje2 =parseInt( e.target.elements.eje2.value.trim())
        const eje3 = parseInt( e.target.elements.eje3.value.trim() )

        const eje4 = parseInt( e.target.elements.eje4.value.trim())
        const eje5 = parseInt( e.target.elements.eje5.value.trim() )
        const eje6 =  parseInt( e.target.elements.eje6.value.trim() )

        const eje7 = parseInt( e.target.elements.eje7.value.trim() )
        const eje8 =parseInt ( e.target.elements.eje8.value.trim() )
        const eje9 = parseInt( e.target.elements.eje9.value.trim() )

        const eje10 = parseInt( e.target.elements.eje10.value.trim())
        const eje11 = parseInt( e.target.elements.eje11.value.trim() )
        const eje12 =parseInt( e.target.elements.eje12.value.trim() )
        const totalAnioEje = VerEjec(eje1)+VerEjec(eje2)+VerEjec(eje3)+VerEjec(eje4)+VerEjec(eje5)+VerEjec(eje6)+VerEjec(eje7)+VerEjec(eje8)+VerEjec(eje9)+VerEjec(eje10)+VerEjec(eje11)+VerEjec(eje12)
       


        const tempo = {
            ...dataPoaID,
            totalAnioEje : totalAnioEje,
        
            eje1: eje1,
            eje2: eje2,
            eje3: eje3,
            eje4: eje4,
            eje5: eje5,
            eje6: eje6,
            eje7: eje7,
            eje8: eje8,
            eje9: eje9,
            eje10: eje10,
            eje11: eje11,
            eje12: eje12
        }
     

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
                                <h3 className="text-lg font-semibold"> Seguimiento Planificación operativa anual...</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>
                            {/* Cuerpo del modal */}

                            {isSuccessPoaID ?

                                <form onSubmit={guardarCambios} method='PUT'>
                                    <div className='grid grid-cols-2  border-b border-gray-300'>
                                        <div className='text-sm'>Año : {dataPoaID.anio} </div>
                                        <div className='text-sm'>Total : {dataPoaID.totalAnio}</div>
                                        
                                        
                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">


                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs  mb-2">Pro1: {dataPoaID.pro1}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m1}
                                                type="number"
                                                name="eje1"
                                                id="eje1"
                                                defaultValue={dataPoaID.eje1}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs  mb-2">Pro2: {dataPoaID.pro2}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m2}
                                                type="number"
                                                name="eje2"
                                                id="eje2"
                                                defaultValue={dataPoaID.eje2}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs mb-2">Pro3: {dataPoaID.pro3}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m3}
                                                type="number"
                                                name="eje3"
                                                id="eje3"
                                                defaultValue={dataPoaID.eje3}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs  mb-2">Pro4: {dataPoaID.pro4}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m4}
                                                type="number"
                                                name="eje4"
                                                id="eje4"
                                                defaultValue={dataPoaID.eje4}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs mb-2">Pro5: {dataPoaID.pro5}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m5}
                                                type="number"
                                                name="eje5"
                                                id="eje5"
                                                defaultValue={dataPoaID.eje5}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs mb-2">Pro6: {dataPoaID.pro6}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m6}
                                                type="number"
                                                name="eje6"
                                                id="eje6"
                                                defaultValue={dataPoaID.eje6}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs mb-2">Pro7: {dataPoaID.pro7}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m7}
                                                type="number"
                                                name="eje7"
                                                id="eje7"
                                                defaultValue={dataPoaID.eje7}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs  mb-2">Pro8: {dataPoaID.pro8}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m8}
                                                type="number"
                                                name="eje8"
                                                id="eje8"
                                                defaultValue={dataPoaID.eje8}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs mb-2">Pro9: {dataPoaID.pro9}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m9}
                                                type="number"
                                                name="eje9"
                                                id="eje9"
                                                defaultValue={dataPoaID.eje9}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs mb-2">Pro10: {dataPoaID.pro10}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m10}
                                                type="number"
                                                name="eje10"
                                                id="eje10"
                                                defaultValue={dataPoaID.eje10}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs mb-2">Pro11: {dataPoaID.pro11}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m11}
                                                type="number"
                                                name="eje11"
                                                id="eje11"
                                                defaultValue={dataPoaID.eje11}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>
                                        <div className="mb-4 mr-1">
                                            <label className="block text-xs  mb-2">Pro12: {dataPoaID.pro12}</label>
                                            <input
                                                disabled={enableSeguimientoPoa.en_m12}
                                                type="number"
                                                name="eje12"
                                                id="eje12"
                                                defaultValue={dataPoaID.eje12}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-green-500 text-xs " 
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
