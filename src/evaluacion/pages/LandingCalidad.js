import React from 'react'
import Navbar_dashboard from '../../pages/components/Navbar_dashboard'

export default function LandingCalidad() {
  return (
    <div>
      <Navbar_dashboard />
      <div className='grid grid-cols-2 mt-20'>

        <div className='flex justify-center items-center' > <a  className='bg-gray-200 p-2 ' href='/acreditacion/landing'>Autoevaluación</a></div>
        <div  className='flex justify-center items-center '> <a className='bg-gray-200 p-2' href='/evaluacion/evidencia'>Evaluación externa</a></div>
      </div>

    </div>
  )
}
