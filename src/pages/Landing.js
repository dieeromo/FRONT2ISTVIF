import React, { useState } from 'react'
import Navbar_visitantes from './components/Navbar_visitantes'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../services/authDatosApi'
import { setUserDatos } from '../features/authDatosSlice'

import { useDispatch } from 'react-redux'
import CardsServicios from './components/CardsServicios'

const Landing = () => {



    return (
        <div>
            <Navbar_visitantes />
            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl  sm:py-24 lg:max-w-none lg:py-32">
                        <h2 className="text-2xl font-bold text-gray-900">Servicios</h2>
                        <div className="mt-6 space-y-20 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">

                            <CardsServicios
                                name={'Biblioteca'}
                                imageSrc={'https://www.ute.edu.ec/wp-content/uploads/2023/12/biblioteca-rumi127.jpg'}
                                imageAlt={'Biblioteca'}
                                href_direccion={'/biblioteca/filtro/obras'}
                                description={'Servicio de biblioteca del ISTVIF'}
                            />

                            <CardsServicios
                                name={'Psicología'}
                                imageSrc={'https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/2023-07/psicologo-psiquiatra.jpg.webp?itok=bcOct0BJ'}
                                imageAlt={'Psicología'}
                                href_direccion={'#'}
                                description={'Servicio de psicología gratuita del ISTVIF'}
                            />
                            <CardsServicios
                                name={'Bolsa de empleo'}
                                imageSrc={'https://www.uexternado.edu.co/wp-content/uploads/2017/04/bolsaempleo.jpg'}
                                imageAlt={'Bolsa de empleo'}
                                href_direccion={'/general/public/bolsa'}
                                description={'Accede a las oportunidades laborales'}
                            />

                        </div>

                        <div className="mt-6 space-y-30 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            <CardsServicios
                                name={'Instalaciones'}
                                imageSrc={'https://scontent.fuio32-1.fna.fbcdn.net/v/t39.30808-6/362941084_761194746010404_6715772089881272224_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=s4uci-c4_scAb5DkWL9&_nc_ht=scontent.fuio32-1.fna&oh=00_AfCV3_ISacdd010d4nZNx8y6VW6DGSXoSV00Rr-sstqrQw&oe=66140F00'}
                                imageAlt={'Instalaciones'}
                                href_direccion={'#'}
                                description={'Solicita la utilización de las instalaciones del ISTVIF'}
                            />

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Landing