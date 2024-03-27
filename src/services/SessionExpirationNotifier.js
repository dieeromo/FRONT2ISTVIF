import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useAppDispatch} from '../app/hooks'
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const SessionExpirationNotifier = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const expirationTime = JSON.parse(localStorage.getItem('user') || "{}").time_token
  
  useEffect(() => {
    const checkExpiration = () => {
      const currentTime = Date.now();
      console.log('expi',expirationTime)

      console.log('current',currentTime)
      if((expirationTime+10)<currentTime){
        console.log('EXP')
        dispatch(logout())
        navigate('/')
      }
      
    };

    const intervalId = setInterval(checkExpiration, 4000); // Comprueba cada segundo si el token ha expirado

    return () => clearInterval(intervalId); // Limpia el temporizador cuando el componente se desmonta
  }, [expirationTime]);

  return null; // Este componente no renderiza nada visualmente
};

export default SessionExpirationNotifier;
