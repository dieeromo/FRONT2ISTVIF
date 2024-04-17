

import { useState, } from 'react';
import { MdFileUpload } from "react-icons/md";

import axios from 'axios'
import { RUTA_SERVIDOR } from '../../ApiRoutes';
import { useNavigate } from 'react-router-dom';
import {useGetListAutoresObras_todosQuery} from '../services/bibliotecaApi'

const CargaObrasModal = ({ id}) => {
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
            const { data } = await axios.put(RUTA_SERVIDOR + `/biblioteca/carga/obras/`, formData, config);
            if (data) {
               
                closeModal2()
            }

        } catch (error) {
            
        }
    };

    const closeModal2 = (e) => {
        setIsOpen(false)
       
        navigate(`/biblioteca/lista/obras_autores`)
    };
    const closeModal = (e) => {
        setIsOpen(false)
    };

    return (
        <div className="relative">
            <button className="bg-blue-00 hover:bg-blue-700  text-xs font-bold py-1 px-1 rounded" onClick={openModal}>
                <MdFileUpload />
            </button>

            {isOpen && (

                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-60">
                    <div className="bg-white p-6 rounded-lg">

                        <form className="">
                            <p>Seleccione el documento</p>

                            <input type="file" onChange={handleFileSave} className='rounded bg-gray-100 pr-2 mr-3 ' />
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

export default CargaObrasModal;
