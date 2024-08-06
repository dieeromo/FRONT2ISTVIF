import React from 'react'
import {useDeleteArchivoEvaluacionMutation, usePutDocumentoMutation, useGetDocumentoIDQuery} from '../services/evaluacionApi'

import { useState, } from 'react';

export default function ModalDeleteArchivo({documentoID}) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")  // para [asar las credenciales]
    const { data: dataDocumento, isSuccess: isSuccessDocumento } = useGetDocumentoIDQuery({ access: user.access, documentoID: documentoID })
    const [deleteArchivo] = useDeleteArchivoEvaluacionMutation()

    const [isOpen, setIsOpen] = useState(false);
  

    const openModal = () => { setIsOpen(true) };
    const closeModal = (e) => {setIsOpen(false)};

    const [borrarLink] = usePutDocumentoMutation()
    const deleteModal = async (e) => {
        deleteArchivo({access:user.access, documentoID:documentoID})
        
        let tempo = {
            ...dataDocumento,
            
            link:'',
    
        }

        // try {
        borrarLink({ access: user.access, documentoID: documentoID, rest: tempo })
            

        // } catch (error) {
        //     console.log('error al borrar', error)
        // }
        closeModal()
    };





  return (
    <div className="relative">
    <button className="bg-blue-00 hover:bg-blue-700  text-xs font-bold py-1 px-1 rounded" onClick={openModal}>
    -
    </button>

    {isOpen && (
   
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-60">
            <div className="bg-white p-6 rounded-lg">
            
                    <form>
                   <p>Esta seguro de eliminar el ARCHIVO/LINK</p>
                    
                    <button className=" bg-gray-200 p-2 rounded mr-2 hover:text-blue-600" onClick={deleteModal}>
                        Borrar
                    </button>
                    <button onClick={closeModal} className=" bg-gray-200 p-2 rounded mr-2 hover:text-blue-600">
                        X
                    </button>

                </form>
         


            </div>
        </div>
    )}
</div>
  )
}
