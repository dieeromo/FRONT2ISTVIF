

import { useState, } from 'react';
import { MdFileUpload } from "react-icons/md";

import axios from 'axios'
import { RUTA_SERVIDOR } from '../../ApiRoutes';
import { useNavigate } from 'react-router-dom';


const CargaDocumentoModal= ({id, indicador_id}) => {
    const navigate = useNavigate()
   
    const user = JSON.parse(localStorage.getItem('user') || "{}")  // para [asar las credenciales]


    const [isOpen, setIsOpen] = useState(false);

  

    const openModal = () => { setIsOpen(true) };


    const handleFileSave = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append('archivo', file)
        formData.append('id', id)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `JWT ${user.access}`
                }
            }
            const { data } = await axios.put(RUTA_SERVIDOR + `/documentos_acreditacion/subir_archivo/`, formData, config);
          
            
            if(data){
                closeModal()
            }

        } catch (error) {
            console.log(error)
        }
    };

    const closeModal = (e) => {
        
        setIsOpen(false)
        navigate(`/acreditacion/evidencia/${indicador_id}`)
    };

    return (
        <div className="relative">
            <button className="bg-blue-100 hover:bg-blue-700  text-xs font-bold py-1 px-1 rounded" onClick={openModal}>
            <MdFileUpload  />
            </button>

            {isOpen && (
           
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                    
                            <form>
                           <p>Seleccione el documento</p>

                           <input type="file"  onChange={handleFileSave} />
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

export default CargaDocumentoModal;
