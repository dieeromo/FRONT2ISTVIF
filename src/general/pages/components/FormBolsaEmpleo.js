import React from 'react'
import { usePostBolsaEmpleoMutation } from '../../services/generalApi'
import { useState } from 'react'

export default function FormBolsaEmpleo() {
  const user = JSON.parse(localStorage.getItem('user') || "{}")
  const userDatos = JSON.parse(localStorage.getItem('userDatos') || "{}")
  const [postBolsa, { data: dataBolsa, isSuccess: isSuccessBolsa }] = usePostBolsaEmpleoMutation()

  const [descripcion, setDescripcion] = useState('');

  const handleChangeDescripcion = (e) => {
    setDescripcion(e.target.value);
  };


  const handleSubmit = (e) => {

    e.preventDefault()
    const institucion = e.target.elements.institucion.value.trim()
    //const descripcion = e.target.elements.descripcion.value
    const fecha_limite = e.target.elements.fecha_limite.value.trim()
    const url = e.target.elements.url.value.trim()
    const phone = e.target.elements.phone.value.trim()
    const email = e.target.elements.email.value.trim()
    postBolsa([user.access, userDatos.id, institucion, descripcion, fecha_limite, url,phone, email])

    e.target.elements.institucion.value = ''
    e.target.elements.fecha_limite.value = ''
    e.target.elements.url.value = ''
    setDescripcion('')


  }

  return (
    <div className="x-1/2">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className='grid grid-cols-2'>
          <div>

            <div className="mb-4 mx-2">
              <label className="block text-gray-700 text-xs font-bold" htmlFor="institucion">
                Institución
              </label>
              <input
                className="shadow text-xs appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="institucion"
                type="text"
                name="institucion"
                placeholder="Nombre de la institución"
              />

            </div>


            <div className="mb-4 mx-2">
              <label className=" text-xs block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                URL
              </label>
              <input
                className="text-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="url"
                type="text"
                name="url"
                placeholder="URL"
              />
            </div>
            <div className='grid grid-cols-2'>

              <div className="mb-4 w-1/2">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="fecha_limite">
                  Fecha Límite
                </label>
                <input
                  className=" text-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fecha_limite"
                  type="date"
                  name="fecha_limite"
                  placeholder="Fecha límite"

                />
              </div>
              <div className="mb-4 ">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                  Teléfono
                </label>
                <input
                  className=" text-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Teléfono"

                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="text-xs bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </div>

          </div>
          <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xs font-bold" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              className="text-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="descripcion"
              type="text"
              name="descripcion"
              placeholder="Descripción de la oferta"
              rows={6}
              value={descripcion}
              onChange={handleChangeDescripcion}
            />
          </div>
          <div className="mb-2 mx-4 ">
                <label className="block text-gray-700 text-xs font-bold mb-2 " htmlFor="email">
                  Email
                </label>
                <input
                  className=" text-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"

                />
              </div>


          </div>









        </div>
      </form>

    </div>
  )
}
