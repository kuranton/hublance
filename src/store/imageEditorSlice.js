import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  url: '',
  cropping: false,
  draggingFile: false,
  warning: '',
  imgData: {
    dx: 0,
    dy: 0,
    dWidth: 0,
    dHeight: 0,
    aspectRatio: 0
  },
  canvas: {
    zoomAmount: 0,
    rotation: 0.5,
    dragging: false,
    dragStartPos: {x:0, y:0}
  }
}

export const imageEditorSlice = createSlice({
  name: 'imageEditor',
  initialState,
  reducers: {
    open: (state) => {state.isOpen = true},
    close: (state) => {state.isOpen = false},
    setUrl: (state, action) => {state.url = action.payload},
    setCropping: (state, action) => {state.cropping = action.payload},
    setDraggingFile: (state, action) => {state.draggingFile = action.payload},
    setWarning: (state, action) => {state.warning = action.payload},
    setImgData: (state, action) => {state.imgData = {...state.imgData, ...action.payload}},
    setZoomAmount: (state, action) => {state.canvas.zoomAmount = action.payload},
    setRotation: (state, action) => {state.canvas.rotation = action.payload},
    setDragging: (state, action) => {state.canvas.dragging = action.payload},
    setDragStartPos: (state, action) => {state.canvas.dragStartPos = action.payload}
  },
})

export const {open, close, setUrl, setCropping, setDraggingFile, setWarning, setImgData, setZoomAmount, setRotation, setDragging, setDragStartPos} = imageEditorSlice.actions

export default imageEditorSlice.reducer
