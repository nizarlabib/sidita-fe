import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
    },
  },
  reducers: {
    setData: (state,action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setData, setDataUserCommunity } = userSlice.actions

export default userSlice.reducer
