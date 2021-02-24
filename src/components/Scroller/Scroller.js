import useCustomScroller from './useCustomScroller'

import style from './Scroller.module.css'

const Scroller = ({maxHeight, children, scrollbarStyle = {}}) => {
  const [{style: inlineStyle, ...scrollerProps}, trackProps] = useCustomScroller(children)
  const combinedStyle = {...inlineStyle, maxHeight}

  return(
    <div className={style.wrap}>
      <div className={style.scroller} style={combinedStyle} {...scrollerProps}>
        {children}
      </div>
      <div className={style.scrollbar} style={scrollbarStyle}>
        <div className={style.caret} {...trackProps}/>
      </div>
    </div>
  )
}

export default Scroller
