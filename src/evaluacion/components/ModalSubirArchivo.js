import React from 'react'
import { useState, } from 'react';
import { useGetDocumentoIDQuery, usePutDocumentoMutation } from '../services/evaluacionApi'
export default function ModalSubirArchivo({ documentoID }) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")

    const { data: dataDocumento, isSuccess: isSuccessDocumento } = useGetDocumentoIDQuery({ access: user.access, documentoID: documentoID })

    const [selectedOption, setSelectedOption] = useState(''); // para definir si se sube archivo o link

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => { setIsOpen(true) };

    const closeModal = (e) => {
        setIsOpen(false)
    };

    const [archivo, setArchivo] = useState(null);
    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const [link, setLink] = useState('')

    const [subirArchivo] = usePutDocumentoMutation()
    const guardarCambios = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('evidenciaEvaluacion', dataDocumento.evidenciaEvaluacion)
        formData.append('nombre', dataDocumento.nombre)
        formData.append('numeral', dataDocumento.numeral)

        formData.append('digitador', dataDocumento.digitador)
        formData.append('responsable', dataDocumento.responsable)

        formData.append('revisado', dataDocumento.revisado)
        formData.append('edicion', dataDocumento.edicion)

        formData.append('archivo', archivo)
        formData.append('link', dataDocumento.link)



        const tempo = {
            ...dataDocumento,
            link: link,
        }

    
        
        if(selectedOption==='Archivo'){
            try {
                await subirArchivo({ access: user.access, documentoID: documentoID, rest: formData }).unwrap()
    
            } catch (error) {
                console.log('error subida de archivo', error)
            }
        }else if(selectedOption==='Link'){
            try {
                await subirArchivo({ access: user.access, documentoID: documentoID, rest: tempo }).unwrap()
    
            } catch (error) {
                console.log('error de link', error)
            } 

        }




        closeModal()

    }
    return (
        <>
            <button className=" rounded" onClick={openModal}>
                +
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-1/2 mx-auto my-6">
                        {/* Contenido del modal */}
                        <div className="bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                            {/* Encabezado del modal */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                <h3 className="text-lg font-semibold"> Subir evidencia</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none bg-gray">x</span>
                                </button>
                            </div>


                            <form onSubmit={guardarCambios} method='PUT'>
                                <select className="border p-2 rounded mb-3"
                                    value={selectedOption}
                                    onChange={handleChange}
                                >
                                    <option value=""> Seleccione una respuesta</option>
                                    <option value="Archivo"> Archivo</option>
                                    <option value="Link"> Link</option>

                                </select>
                                <div>
                                    {
                                        selectedOption === "Archivo" && (
                                            <div className="mb-4 mr-1 mt-2">
                                                <label className='mt-5'>Archivo:</label>
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        )
                                    }

                                </div>
                                <div>
                                    {
                                        selectedOption === "Link" && (
                                            <div className="mb-4 mr-1">
                                                <label className='block text-xs mb-2 mt-5'>Link:</label>
                                                <input
                                                    type="text"
                                                    name="link"
                                                    id='link'
                                                    value={link}
                                                    onChange={(e)=>setLink(e.target.value)}
                                                    className='bg-gray-200 w-3/4 pl-5 pr-5 text-sm'
                                                    placeholder='Ingrese la url'
                                                />
                                            </div>
                                    )}

                                </div>




             
{
                                ( selectedOption === 'Link' || selectedOption==='Archivo' )  &&(
                                    <button
                                    type="submit"
                                    className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                >
                                    Guardar
                                </button>
                                ) 
                        

}






                            </form>

                        </div>
                    </div>
                </div>
            )}
            <div className={`${isOpen ? 'opacity-25 fixed inset-0 z-40 bg-black' : 'hidden'}`}></div>
        </>
    )
}
