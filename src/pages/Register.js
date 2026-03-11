import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRegisterUserMutation } from '../services/authApi'

export const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const [registerUser, { isSuccess, isError, error }] = useRegisterUserMutation()

    const submitHandler = (e) => {
        e.preventDefault()
        registerUser({
            email,
            first_name: firstName,
            last_name: lastName,
            password,
            re_password: rePassword,
        })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/auth')
        }
    }, [isSuccess, navigate])

    return (
        <div className="">
            <div className="flex justify-center mt-10 mb-10">
                <img
                    src="https://institutovicentefierro.edu.ec/wp-content/uploads/2024/01/cropped-Sin-titulo-1.png"
                    alt="Logo"
                    className="h-14 w-34 mt-30"
                />
            </div>
            <div className="inset-0 flex items-center justify-center bg-opacity-60">
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Ingresar correo"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-xs font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            id="first_name"
                            name="first_name"
                            type="text"
                            placeholder="Ingresar nombre"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-xs font-medium text-gray-700">
                            Apellido
                        </label>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            id="last_name"
                            name="last_name"
                            type="text"
                            placeholder="Ingresar apellido"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Ingresar contraseña"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="re_password" className="block text-xs font-medium text-gray-700">
                            Confirmar contraseña
                        </label>
                        <input
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            id="re_password"
                            name="re_password"
                            type="password"
                            placeholder="Confirmar contraseña"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white text-sm p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Registrarse
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                            Ya tienes una cuenta?{' '}
                            <Link to="/auth" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Iniciar Sesión
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            {isError && (
                <p className="text-red-500 flex justify-center mt-2">
                    {error?.data?.email?.[0] || error?.data?.password?.[0] || 'Error al registrar usuario'}
                </p>
            )}
        </div>
    )
}

export default Register
