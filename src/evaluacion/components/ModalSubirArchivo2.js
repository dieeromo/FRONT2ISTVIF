import React from 'react'
import { useState, } from 'react';
import { useGetDocumentoIDQuery, usePutDocumentoMutation } from '../services/evaluacionApi'


export default function ModalSubirArchivo2({ documentoID }) {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
    const [boleanError, setBooleanError] = useState(false)
    const [isLoadingArchivo, setIsLoadingArchivo] = useState(false)
    const [errorArchivo, setErrorArchivo] = useState('')
    const [enableSubir, setEnableSubir] = useState(false)

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
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setErrorArchivo('Solo se permiten archivos PDF');
                setBooleanError(true)
                setArchivo(null);
            } else if (file.size > 5 * 1024 * 1024) { // 10 MB en bytes
                setErrorArchivo('El archivo debe ser menor a 5 MB');
                setArchivo(null);
                setBooleanError(true)
            } else {
                setArchivo(file);
                setEnableSubir(true)
                setBooleanError(false)
                setErrorArchivo('');
            }
        }
    };

    const [link, setLink] = useState('')

    const [subirArchivo] = usePutDocumentoMutation()

    const guardarCambios = async (e) => {
        e.preventDefault()
        setIsLoadingArchivo(true)
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
        formData.append('estado2', 1)



        const tempo = {
            ...dataDocumento,
            link: link,
            estado2: 1,
        }



        if (selectedOption === 'Archivo') {
            try {
                await subirArchivo({ access: user.access, documentoID: documentoID, rest: formData }).unwrap()


            } catch (error) {
                console.log('error subida de archivo', error)
                setErrorArchivo(error)
            } finally {
                closeModal()
            }
        } else if (selectedOption === 'Link') {
            try {
                await subirArchivo({ access: user.access, documentoID: documentoID, rest: tempo }).unwrap()

            } catch (error) {
                console.log('error de link', error)
                setErrorArchivo(error)
            } finally {
                closeModal()
            }

        }
        //closeModal()
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


                            <form onSubmit={guardarCambios} method='PUT' className='p-4'>
                                <select className="border p-2 rounded mb-3"
                                    value={selectedOption}
                                    onChange={handleChange}
                                >
                                    <option value=""> Seleccione una opcion</option>
                                    <option value="Archivo"> Archivo</option>
                                    <option value="Link"> Link</option>

                                </select>
                                <div>
                                    {
                                        selectedOption === "Archivo" && (
                                            <div>
                                                <div className="mb-4 mr-1 mt-2">
                                                    <label className='mt-5'>Archivo:</label>
                                                    <input
                                                        type="file"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>

                                                <div className='text-xs text-gray-500'>El tamaño máximo es de 5 MB</div>
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
                                                    onChange={(e) => setLink(e.target.value)}
                                                    className='bg-gray-200 w-3/4 pl-5 pr-5 text-sm'
                                                    placeholder='Ingrese la url'
                                                />
                                            </div>
                                        )}
                                    <div>
                                        {isLoadingArchivo && <p className='font-bold mb-3'>Cargando archivo</p>}

                                    </div>

                                </div>
                                <div className='text-red-500 text-font-bold'>{errorArchivo}</div>

                                {
                                    (selectedOption === 'Link' || selectedOption === 'Archivo') && (
                                        <div>
                                            {!boleanError && (
                                                <>
                                                    {enableSubir && (
                                                        <button
                                                            type="submit"
                                                            className="bg-indigo-500 mt-3 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                                                            disabled={isLoadingArchivo}
                                                        >
                                                            Guardar
                                                        </button>
                                                    )}
                                                </>

                                            )}
                                        </div>

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
