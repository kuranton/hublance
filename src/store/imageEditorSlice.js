import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {refreshToken} from '@store/authSlice'
import {setPhotoUrl} from '@store/profileSlice'

const initialState = {
  isOpen: false,
  url: '',
  cropping: false,
  draggingFile: false,
  warning: '',
  aspectRatio: 0,
  imgData: {
    dx: 0,
    dy: 0,
    dWidth: 0,
    dHeight: 0
  },
  canvas: {
    zoomAmount: 0,
    rotation: 0.5,
    dragging: false
  }
}

export const imageEditorSlice = createSlice({
  name: 'imageEditor',
  initialState,
  reducers: {
    open: (state) => {state.isOpen = true},
    close: (state) => initialState,
    setUrl: (state, action) => {state.url = action.payload},
    setCropping: (state, action) => {state.cropping = action.payload},
    setDraggingFile: (state, action) => {state.draggingFile = action.payload},
    setWarning: (state, action) => {state.warning = action.payload},
    setAspectRatio: (state, action) => {state.aspectRatio = action.payload},
    setImgData: (state, action) => {state.imgData = action.payload},
    setZoomAmount: (state, action) => {state.canvas.zoomAmount = action.payload},
    setRotation: (state, action) => {state.canvas.rotation = action.payload},
    setDragging: (state, action) => {state.canvas.dragging = action.payload}
  },
})

export const save = createAsyncThunk(
  'imageEditor/saveStatus',
  async (image, {dispatch, getState}) => {
    let {token, expiry} = getState().auth.accessToken
    if (!token || new Date(expiry) < Date.now()) {
      await dispatch(refreshToken())
      const {accessToken} = getState().auth
      token = accessToken.token
    }
    const {_id} = getState().profile.data
    if (!token) {
      return
    }
    const body = new FormData()
    body.append('image', image)
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${_id}/image`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body
      })
      if (!res.ok) {
        return
      }
      const {photoUrl} = await res.json()
      dispatch(setPhotoUrl(photoUrl))
    } catch (e) {
      console.log(e)
    }
  }
)

export const {open, close, setUrl, setCropping, setDraggingFile, setWarning, setAspectRatio, setImgData, setZoomAmount, setRotation, setDragging} = imageEditorSlice.actions

export default imageEditorSlice.reducer
