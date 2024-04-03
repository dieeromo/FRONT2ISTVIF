import { useGetUsuariosQuery } from '../services/usuariosApi'
import { useState, } from 'react';

export function SelectorClientes() {
    const user = JSON.parse(localStorage.getItem('user') || "{}")
    const { data: dataUsuarios, isSuccess: isSuccessUsuario, } = useGetUsuariosQuery([user.access])

    let list_usuarios
    if (isSuccessUsuario){
        const tempo = dataUsuarios.map((item) => ({
            label: item.first_name,
            value: item.id
        }))
        list_usuarios=(tempo)
    }

    return (list_usuarios)
}