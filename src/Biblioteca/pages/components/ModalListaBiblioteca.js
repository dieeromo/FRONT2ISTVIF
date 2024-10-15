

import { useState, } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";

import {useDeleteObraEntradaMutation} from '../../services/bibliotecaApi'
const ModalListaBiblioteca = ({id}) => {
   
    const user = JSON.parse(localStorage.getItem('user') || "{}")  // para [asar las credenciales]
    const [deleteObra] = useDeleteObraEntradaMutation()

    const [isOpen, setIsOpen] = useState(false);
  

    const openModal = () => { setIsOpen(true) };
    
    const deleteModal = (e) => {
        deleteObra({access:user.access, id:id})
        closeModal()
    };


    const closeModal = (e) => {
        setIsOpen(false)
    };

    return (
        <div className="relative">
            <button className="bg-blue-00  hover:bg-blue-700  text-xs font-bold py-1 px-1 rounded" onClick={openModal}>
            <FaRegTrashAlt />
            </button>

            {isOpen && (
           
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-60">
                    <div className="bg-white p-6 rounded-lg">
                    
                            <form>
                           <p>Esta seguro de eliminar la entrada</p>
                            
            
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
    );
};

export default ModalListaBiblioteca ;
