import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      addNotification(state, action) {
        const content = action.payload
        return content
      }
    }
})

export const { addNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
  return async dispatch => {
    dispatch(addNotification(text))
    setTimeout(() => {
      dispatch(addNotification(''))
    }, time*1000)
  }
}

export default notificationSlice.reducer