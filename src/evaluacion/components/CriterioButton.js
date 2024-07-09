import React from 'react'

export default function CriterioButton({criterio, onClick}) {
  return (
    <button onClick={()=>onClick(criterio.id)} className='bg-gray-200 mx-5'> 
    {criterio.nombre}
    </button>
  )
}
