

import { useState,useEffect  } from 'react';
import { useUpdCriteriosMutation } from '../services/criteriosApi'

import {SelectorClientes} from '../../usuarios/norender/Selectores'
import Select from 'react-select';
const ModalCriterios = ({ 
    id, 
    criterio_default, 
    fecha_creacion_default, 
    responsable_default,
    responsable_default_id 
}) => {
   

    const user = JSON.parse(localStorage.getItem('user') || "{}")  // para [asar las credenciales]
  
    let usua =  SelectorClientes()
    console.log(usua)

    console.log('responsable',responsable_default)
    

    const [criterio, setCriterio] = useState(criterio_default)
    const [fecha_creacion, setFecha_creaciom] = useState(fecha_creacion_default)

    const [isOpen, setIsOpen] = useState(false);
    const [updCriterio, { data, isSuccess }] = useUpdCriteriosMutation()

    const openModal = () => { setIsOpen(true) };
    const closeModal = (e) => {
        updCriterio([user.access, id, criterio, fecha_creacion])
        setIsOpen(false)
    };

    return (
        <div className="relative">
            <button className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded" onClick={openModal}>
                Open Modal
            </button>

            {isOpen && (
           
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                    
                            <form>
                            <input type="text" name="criterio" defaultValue={criterio_default} onChange={(e) => setCriterio(e.target.value)} />
                            <input type="date" name="fecha_creacion" defaultValue={fecha_creacion_default} onChange={(e) => setFecha_creaciom(e.target.value)} />
                            <Select
                            options={usua}
                            defaultValue = {usua[1]}
                            />
                            <button className=" bg-green-500 hover:text-blue-600" onClick={closeModal}>
                                Guardar
                            </button>
                            <button onClick={closeModal}>
                                X
                            </button>

                        </form>
                 


                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalCriterios;
