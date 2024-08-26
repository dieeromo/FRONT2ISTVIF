import React from 'react'

export default function CriterioButton({criterio, onClick}) {
  return (
    <button onClick={()=>onClick(criterio.id)}      className='bg-gray-300 text-xs mx-2'> 
    {criterio.nombre}
    </button>
  )
}
