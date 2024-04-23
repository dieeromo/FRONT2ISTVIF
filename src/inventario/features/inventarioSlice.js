
import { createSlice ,PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  inventario: null,
}

const inventarioSlice = createSlice({
  name: 'inventario',
  initialState,
  reducers: {

  },
})


export default inventarioSlice.reducer
