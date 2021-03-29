import {useSelector, useDispatch} from 'react-redux'
import {setRotation} from '@store/imageEditorSlice'

import style from './Controls.module.css'

import Slider from '@components/Slider'

const Controls = ({zoom}) => {
  const dispatch = useDispatch()
  const zoomAmount = useSelector(store => store.imageEditor.canvas.zoomAmount)
  const rotation = useSelector(store => store.imageEditor.canvas.rotation)

  const rotate = (amount) => {
    dispatch(setRotation(amount))
  }

  return(
    <div className={style.controls}>
      <Slider title='Zoom' onChange={zoom} filled={zoomAmount}/>
      <Slider title='Straighten' onChange={rotate} filled={rotation}/>
    </div>
  )
}

export default Controls
