import {createSlice,PayloadAction} from '@reduxjs/toolkit'

const initialState = {
    email:null,
    first_name: null,
    last_name: null,
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
                })
            );
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
        }
    }
});


const selectAuthDatos = (state) => state.authDatos;
const { setUserDatos } = authDatosSlice.actions;


export { selectAuthDatos, setUserDatos};
export default authDatosSlice.reducer

