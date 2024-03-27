import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useLoginUserMutation} from '../services/authApi'
import { useAppDispatch } from '../app/hooks'
import { setUser } from '../features/authSlice'


const initialState = {
    email: "",
    password: ""
}

export const Auth = () => {
    const navigate = useNavigate()
    const [formValue, setFormValue] = useState(initialState)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const  dispatch = useAppDispatch()

    const [loginUser,{data:loginData,isSuccess:isLoginSuccess,isError:isLoginError,error:loginError}]=useLoginUserMutation()

    const submitHandler = (e) => {
        e.preventDefault();
        loginUser({email,password})
    };


    useEffect(()=>{
        if(isLoginSuccess){
            dispatch(setUser({refresh:loginData.refresh, access:loginData.access, time_token:Date.now()}))
            navigate('/dashboard')
        }
    })

    return (
        <div>
            <div>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                            required

                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Ingresar contraseña"
                        />
                    </div>

                    <div className="mb-4">{/* Additional options or elements here if needed */}</div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Iniciar Sesión
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                            No tienes una cuenta aún?{' '}
                            {/* <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Registrarse
                  </Link> */}
                        </p>
                    </div>
                </form>

            </div>
        </div> 
  )
}



export default Auth