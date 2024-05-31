import React from 'react'
import { useState, } from 'react';
import { useUpdatePoaMutation } from '../../services/pediApi'
import { useGetDependencias_allQuery, } from '../../../general/services/generalApi'
//import Select from 'react-select'
//import { AiOutlineForm } from "react-icons/ai";
//import {numeroPoaConfig} from '../../../ConfiguracionApp'
//import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import {enableSeguimientoPoa} from '../../../ConfiguracionApp'

export default function ModalSeguimientoCreate({ indicadorPedi, info_poa }) {
    
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const [isOpen, setIsOpen] = useState(false);

    const [indicador, setIndicador] = useState('')
    const [anio, setAnio] = useState(info_poa.anio)
    const [total, setTotal] = useState(info_poa.totalAnio)
    const [mes1, setMes1] = useState(info_poa.eje1)
    const [mes2, setMes2] = useState(info_poa.eje2)
    const [mes3, setMes3] = useState(info_poa.eje3)
    const [mes4, setMes4] = useState(info_poa.eje4)
    const [mes5, setMes5] = useState(info_poa.eje5)
    const [mes6, setMes6] = useState(info_poa.eje6)
    const [mes7, setMes7] = useState(info_poa.eje7)
    const [mes8, setMes8] = useState(info_poa.eje8)
    const [mes9, setMes9] = useState(info_poa.eje9)
    const [mes10, setMes10] = useState(info_poa.eje10)
    const [mes11, setMes11] = useState(info_poa.eje11)
    const [mes12, setMes12] = useState(info_poa.eje12)





    const [observacion, setObservacion] = useState('')

    const { data: dataDependencias, isSuccess: isSuccessDependencias } = useGetDependencias_allQuery(user.access)

    const [updatePoa, { data, isSuccess }] = useUpdatePoaMutation()
    //const [updateIndicadorPedi, { data: dataIndicador, isSuccess:isSuccessIndicador }] =  useUpdateIndicador_pediMutation()


    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        //updDocumento([user.access,id, documento])
        setIsOpen(false)
    };






    const guardarCambios = (e) => {

        updatePoa([
            user.access,

            anio,
            total, //total anio
            info_poa.pro1,
            info_poa.pro2,
            info_poa.pro3,
            info_poa.pro4,
            info_poa.pro5,
            info_poa.pro6,
            info_poa.pro7,
            info_poa.pro8,
            info_poa.pro9,
            info_poa.pro10,
            info_poa.pro11,
            info_poa.pro2,
            mes1,
            mes2,
            mes3,
            mes4,
            mes5,
            mes6,
            mes7,
            mes8,
            mes9,
            mes10,
            mes11,
            mes12,


            info_poa.activo,

            info_poa.observacion,
            info_poa.NumeroSeguimiento,
            info_poa.id_indicador,
            info_poa.digitador,

            info_poa.idPoa,

        ])



        setIndicador('')
        setObservacion('')

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
                                <h3 className="text-lg font-semibold">Seguimiento POA</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>
                            {/* Cuerpo del modal */}
                            <div className="relative p-6 flex-auto">

                                <table>
                                    <thead>
                                        <tr className="bg-lime-900 text-white text-sm  py-2 px-8 text-center">
                                            <td>Actividad</td>
                                            <td>Medio de Verificacion</td>
                                            <td>Indicador</td>
                                            <td>POA {info_poa.anio}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-400 text-xs px-2">{info_poa.actividad}</td>
                                            <td className="border border-gray-400 text-xs px-2">{info_poa.medio_verificacion}</td>
                                            <td className="border border-gray-400 text-xs px-2">{info_poa.total} {info_poa.indicadorPedi}</td>
                                            <td className="border border-gray-400 text-xs px-2">{info_poa.totalAnio}</td>
                                        </tr>
                                    </tbody>
                                </table>


                                {/* Campos de texto y número */}





                                <div className='grid grid-cols-6'>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs font-bold mb-2">m1:{info_poa.pro1}</label>
                                        <input
                                            type="number"
                                            //value={mes1}
                                            disabled = {enableSeguimientoPoa.en_m1}
                                            defaultValue={info_poa.eje1}
                                            onChange={(e) => setMes1(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs font-bold mb-2">m2:{info_poa.pro2}</label>
                                        <input
                                            type="number"
                                           
                                            disabled = {enableSeguimientoPoa.en_m2}
                                            defaultValue={info_poa.eje2}
                                            onChange={(e) => setMes2(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs font-bold mb-2">m3:{info_poa.pro3}</label>
                                        <input
                                            type="number"
                                            
                                            disabled = {enableSeguimientoPoa.en_m3}
                                            defaultValue={info_poa.eje3}
                                            onChange={(e) => setMes3(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs font-bold mb-2">m4:{info_poa.pro4}</label>
                                        <input
                                            type="number"
                                           
                                            disabled = {enableSeguimientoPoa.en_m4}
                                            defaultValue={info_poa.eje4}
                                            onChange={(e) => setMes4(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-xs font-bold mb-2">m5: {info_poa.pro5}</label>
                                        <input
                                            type="number"
                                            
                                            disabled = {enableSeguimientoPoa.en_m5}
                                            defaultValue={info_poa.eje5}
                                            onChange={(e) => setMes5(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-xs font-bold mb-2">m6: {info_poa.pro6}</label>
                                        <input
                                            type="number"
                                            
                                            disabled = {enableSeguimientoPoa.en_m6}
                                            defaultValue={info_poa.eje6}
                                            onChange={(e) => setMes6(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                </div>

                                <div className='grid grid-cols-6'>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs font-bold mb-2">m7: {info_poa.pro7}</label>
                                        <input
                                            type="number"
                                           
                                            disabled = {enableSeguimientoPoa.en_m7}
                                            defaultValue={info_poa.eje7}
                                            onChange={(e) => setMes7(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs font-bold mb-2">m8: {info_poa.pro8}</label>
                                        <input
                                            type="number"
                                           
                                            disabled = {enableSeguimientoPoa.en_m8}
                                            defaultValue={info_poa.eje8}
                                            onChange={(e) => setMes8(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs font-bold mb-2">m9: {info_poa.pro9}</label>
                                        <input
                                            type="number"
                                           
                                            disabled = {enableSeguimientoPoa.en_m9}
                                            defaultValue={info_poa.eje9}
                                            onChange={(e) => setMes9(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 mr-1">
                                        <label className="block text-xs font-bold mb-2"> m10: {info_poa.pro10}</label>
                                        <input
                                            type="number"
                                           
                                            disabled = {enableSeguimientoPoa.en_m10}
                                            defaultValue={info_poa.eje10}
                                            onChange={(e) => setMes10(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-xs font-bold mb-2">m11: {info_poa.pro11}</label>
                                        <input
                                            type="number"
                                           
                                            disabled = {enableSeguimientoPoa.en_m11}
                                            defaultValue={info_poa.eje11}
                                            onChange={(e) => setMes11(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-xs font-bold mb-2">m12: {info_poa.pro12}</label>
                                        <input
                                            type="number"
                                            value={mes12}
                                            disabled = {enableSeguimientoPoa.en_m12}
                                            defaultValue={info_poa.eje12}
                                            onChange={(e) => setMes12(parseInt(e.target.value))}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>

                                </div>



                                <div className="mb-4">
                                    <label className="block text-xs font-bold mb-2">Observación:</label>
                                    <textarea
                                        type="text"
                                        rows={2}
                                        value={observacion}
                                        onChange={(e) => setObservacion(e.target.value)}
                                        className=" text-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                            </div>
                            {/* Pie del modal */}
                            <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">

                                <button
                                    onClick={guardarCambios}
                                    className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>

    )
}
