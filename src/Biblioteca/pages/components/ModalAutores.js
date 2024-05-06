
import { useState, } from 'react';
import { CiEdit } from "react-icons/ci";

import {usePutAutoresObrasMutation} from '../../services/bibliotecaApi'

const ModalAutores= ({ id, nombres, estado, observacion, digitador }) => {
   

    const user = JSON.parse(localStorage.getItem('user') || "{}")  // para [asar las credenciales]
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const [documento, setDocumento] = useState('')

    const [updAutores, { data, isSuccess }] = usePutAutoresObrasMutation()

    const guardarCambios= (e) => {
        updAutores([user.access,id, documento, estado, observacion, digitador])
        closeModal()
        
    };

    const closeModal = (e) => {
        //updDocumento([user.access,id, documento])
        setIsOpen(false)
    };

    return (
        <div className="relative">
            <button className="bg-blue-00 hover:bg-blue-700  text-xs font-bold py-1 px-1 rounded" onClick={openModal}>
            <CiEdit />
            </button>

            {isOpen && (
           
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-60">
                    <div className="bg-white p-6 rounded-lg">
                    
                            <form>
                            <input type="text" rows={2} name="criterio" defaultValue={nombres} onChange={(e) => setDocumento(e.target.value)} className='rounded bg-gray-100 pr-2 mr-3 ' />
                            
                   
                            <button className=" bg-gray-200 p-2 rounded mr-2 hover:text-blue-600" onClick={guardarCambios}>
                                Guardar
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

export default ModalAutores;
