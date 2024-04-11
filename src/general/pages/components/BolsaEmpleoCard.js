

import React from 'react';

const BolsaEmpleoCard = ({ institution, description, deadline, url,phone,email }) => {
  console.log('desc',description)
  const lineas = description.split('\n').map((linea, index)=>(
    <p key={index}>{linea}</p>
  ))
  return (
    <div className=" rounded overflow-hidden shadow-lg bg-white mb-4 mx-4 rounded-sm">
      <div className="px-6 py-4 ">
        <div className="font-semibold text-lg mb-2 bg-sky-900 rounded text-white text-center">{institution}</div>
        
        <p className="text-gray-700 text-xs">{lineas}</p>
      </div>
      <div className="px-6 py-4 text-right">
        <span className="inline-block bg-sky-900 px-3 py-1 text-xs font-semibold text-white mr-2 mb-2 rounded">Hasta: {deadline}</span>
      </div>
      <div className="px-6 py-2 grid grid-cols-2 border-t border-b border-gray-200 ml-3 mr-3">
        <p className="text-gray-600 text-xs text-center ">{phone}</p>
        <p className="text-gray-600 text-xs text-center">{email}</p>
      </div>
      {url ? 
            <div className="px-4 py-2 mt-3">
            <a href={url} className="bg-sky-700 hover:bg-sky-900 text-white font-bold py-1 px-2 rounded text-xs">
              Ver más
            </a>
          </div>
          :
          <>
          </>
      }

    </div>
    //     <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md mb-4">
    //     <div className="text-center px-6 py-4 bg-gray-800 text-white">
    //       <h2 className="font-bold text-xl">{institution}</h2>
    //     </div>
    //     <div className="px-6 py-4">
    //       <p className="text-sm text-gray-700">{description}</p>
    //     </div>
    //     <div className="px-6 py-4 flex justify-between items-center">
    //       <p className="text-xs text-gray-600">{date}</p>
    //       <div className="flex items-center">
    //         <p className="text-xs text-gray-600 mr-2">{phone}</p>
    //         <p className="text-xs text-gray-600">{email}</p>
    //       </div>
    //     </div>
    //     <div className="px-6 py-4">
    //       <a href={url} className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //         Ver oferta
    //       </a>
    //     </div>
    //   </div>
    );

}
export default BolsaEmpleoCard