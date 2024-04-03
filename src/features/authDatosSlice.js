import {createSlice,PayloadAction} from '@reduxjs/toolkit'

const initialState = {
    email:null,
    first_name: null,
    last_name: null,
    is_rectora : null,
    is_investigacion : null,
    is_vinculacion : null,
    is_coor_academica : null,
    is_coor_estrategico : null,
    is_docente : null,
    is_estudiante: null,
    is_administrativo1 : null,
    is_administrativo2: null,
    is_administrativo3 : null,
    id:null,
};

const authDatosSlice = createSlice({
    name: 'authDatos',
    initialState,
    reducers: {
        setUserDatos: (state, action) => {
            localStorage.setItem(
                "userDatos",
                JSON.stringify({
                    email: action.payload.email,
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    is_rectora : action.payload.is_rectora,
                    is_investigacion : action.payload.is_investigacion,
                    is_vinculacion : action.payload.is_vinculacion,
                    is_coor_academica : action.payload.is_coor_academica,
                    is_coor_estrategico : action.payload.is_coor_estrategico,
                    is_docente : action.payload.is_docente,
                    is_estudiante: action.payload.is_estudiante,
                    is_administrativo1 : action.payload.is_administrativo1,
                    is_administrativo2: action.payload.is_administrativo2,
                    is_administrativo3 : action.payload.is_administrativo3,
                    id : action.payload.id,
                })
            );
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.is_rectora = action.payload.is_rectora;
            state.is_investigacion = action.payload.is_investigacion;
            state.is_vinculacion = action.payload.is_vinculacion;
            state.is_coor_academica = action.payload.is_coor_academica;
            state.is_coor_estrategico = action.payload.is_coor_estrategico;
            state.is_docente = action.payload.is_docente;
            state.is_estudiante= action.payload.is_estudiante;
            state.is_administrativo1 = action.payload.is_administrativo1;
            state.is_administrativo2= action.payload.is_administrativo2;
            state.is_administrativo3 = action.payload.is_administrativo3;
            state.id = action.payload.id;
        }
    }
});


const selectAuthDatos = (state) => state.authDatos;
const { setUserDatos } = authDatosSlice.actions;


export { selectAuthDatos, setUserDatos};
export default authDatosSlice.reducer

