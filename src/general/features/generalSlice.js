
import { createSlice ,PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  general: null,
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {

  },
})


export default generalSlice.reducer
