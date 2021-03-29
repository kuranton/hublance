import style from './Squares.module.css'

const Squares = ({complete}) => {
  return(
    <svg width='672' height='87' viewBox='0 0 672 87' fill='none' xmlns='http://www.w3.org/2000/svg' className={`${style.svg} ${complete ? style.complete : ''}`}>
      <path
        opacity='0.1'
        d='M0 64H11V53.6123C11 53.2738 10.7262 53 10.3877 53H2.44444C1.09389 53 0 54.0951 0 55.4444V64Z'
        fill='#EE7C00'
        style={{transform: 'translateY(90px)', transitionDelay: '30ms'}}
      />
      <path
        opacity='0.1'
        d='M19 21H30V9.668C30 9.29867 29.7262 9 29.3877 9H21.4444C20.0939 9 19 10.1947 19 11.6667V21Z'
        fill='#EE7C00'
        style={{transform: 'translateY(80px)', transitionDelay: '100ms'}}
      />
      <path
        opacity='0.2'
        d='M51 43H62V31.668C62 31.2987 61.7262 31 61.3877 31H53.4444C52.0939 31 51 32.1947 51 33.6667V43Z'
        fill='#EE7C00'
        style={{transform: 'translateY(110px)', transitionDelay: '50ms'}}
      />
      <path
        opacity='0.1'
        d='M83 11H94V0.612334C94 0.273778 93.7262 0 93.3877 0H85.4444C84.0939 0 83 1.09511 83 2.44444V11Z'
        fill='#EE7C00'
        style={{transform: 'translateY(120px)', transitionDelay: '130ms'}}
      />
      <path
        opacity='0.1'
        d='M115 50H126V39.6123C126 39.2738 125.726 39 125.388 39H117.444C116.094 39 115 40.0951 115 41.4444V50Z'
        fill='#EE7C00'
        style={{transform: 'translateY(90px)', transitionDelay: '70ms'}}
      />

      <path
        opacity='0.2'
        d='M661 44H672V32.668C672 32.2987 671.726 32 671.388 32H663.444C662.094 32 661 33.1947 661 34.6667V44Z'
        fill='#EE7C00'
        style={{transform: 'translateY(110px)', transitionDelay: '30ms'}}
      />
      <path
        opacity='0.15'
        d='M619 11H630V0.612334C630 0.273778 629.726 0 629.388 0H621.444C620.094 0 619 1.09511 619 2.44444V11Z'
        fill='#EE7C00'
        style={{transform: 'translateY(120px)', transitionDelay: '70ms'}}
      />
      <path
        opacity='0.1'
        d='M649 78H660V67.6123C660 67.2738 659.726 67 659.388 67H651.444C650.094 67 649 68.0951 649 69.4444V78Z'
        fill='#EE7C00'
        style={{transform: 'translateY(80px)', transitionDelay: '130ms'}}
      />
      <path
        opacity='0.2'
        d='M564 18H553V7.61233C553 7.27378 553.274 7 553.612 7H561.556C562.906 7 564 8.09511 564 9.44444V18Z'
        fill='#EE7C00'
        style={{transform: 'translateY(80px)', transitionDelay: '50ms'}}
      />
      <path
        opacity='0.1'
        d='M598 51H587V40.6123C587 40.2738 587.274 40 587.612 40H595.556C596.906 40 598 41.0951 598 42.4444V51Z'
        fill='#EE7C00'
        style={{transform: 'translateY(90px)', transitionDelay: '90ms'}}
      />

      <g opacity='0.15'>
        <path
          opacity='0.6'
          d='M221 59.6667L207.333 59.6667L207.333 46.7609C207.333 46.3402 207.674 46.0001 208.094 46.0001L217.963 46.0001C219.641 46.0001 221 47.3607 221 49.0371L221 59.6667Z'
          fill='#EE7C00'
          style={{transform: 'translateY(41.01px)', transitionDuration: '630ms', transitionDelay: '150ms'}}
        />
        <path
          opacity='0.4'
          d='M221 73.3335L207.333 73.3335L207.333 59.6668L221 59.6668L221 73.3335Z'
          fill='#EE7C00'
          style={{transform: 'translateY(27.34px)', transitionDuration: '420ms', transitionDelay: '150ms'}}
        />
        <path
          opacity='0.2'
          d='M207.333 73.3333L221 73.3333L221 86.2392C221 86.6599 220.66 87 220.239 87L210.371 87C208.693 87 207.333 85.6394 207.333 83.963L207.333 73.3333Z'
          fill='#EE7C00'
          style={{transform: 'translateY(13.67px)', transitionDuration: '210ms', transitionDelay: '150ms'}}
        />
      </g>
      <g opacity='0.15'>
        <path
          opacity='0.6'
          d='M457 57.6667L471.667 57.6667L471.667 44.7609C471.667 44.3402 471.302 44.0001 470.85 44.0001L460.259 44.0001C458.459 44.0001 457 45.3607 457 47.0371L457 57.6667Z'
          fill='#EE7C00'
          style={{transform: 'translateY(41.01px)', transitionDuration: '450ms', transitionDelay: '220ms'}}
        />
        <path
          opacity='0.4'
          d='M457 71.3335L471.667 71.3335L471.667 57.6668L457 57.6668L457 71.3335Z'
          fill='#EE7C00'
          style={{transform: 'translateY(27.34px)', transitionDuration: '300ms', transitionDelay: '220ms'}}
        />
        <path
          opacity='0.2'
          d='M471.667 71.3333L457 71.3333L457 84.2392C457 84.6599 457.365 85 457.817 85L468.407 85C470.208 85 471.667 83.6394 471.667 81.963L471.667 71.3333Z'
          fill='#EE7C00'
          style={{transform: 'translateY(13.67px)', transitionDuration: '150ms', transitionDelay: '220ms'}}
        />
      </g>

      <g opacity='0.3'>
        <path
          opacity='0.6'
          d='M197.333 42.6665L183.667 42.6665L183.667 29.7606C183.667 29.34 184.007 28.9998 184.428 28.9998L194.296 28.9998C195.974 28.9998 197.333 30.3604 197.333 32.0369L197.333 42.6665Z'
          fill='#EE7C00'
          style={{transform: 'translateY(41.01px)', transitionDuration: '540ms', transitionDelay: '220ms'}}
        />
        <path
          opacity='0.4'
          d='M197.333 56.3333L183.667 56.3333L183.667 42.6666L197.333 42.6666L197.333 56.3333Z'
          fill='#EE7C00'
          style={{transform: 'translateY(27.34px)', transitionDuration: '360ms', transitionDelay: '220ms'}}
        />
        <path
          opacity='0.2'
          d='M183.667 56.3333L197.333 56.3333L197.333 69.2392C197.333 69.6599 196.993 70 196.573 70L186.704 70C185.026 70 183.667 68.6394 183.667 66.963L183.667 56.3333Z'
          fill='#EE7C00'
          style={{transform: 'translateY(13.67px)', transitionDuration: '180ms', transitionDelay: '220ms'}}
        />
      </g>
      <g opacity='0.3'>
        <path
          opacity='0.6'
          d='M482 42.6665L496.667 42.6665L496.667 29.7606C496.667 29.34 496.302 28.9998 495.85 28.9998L485.259 28.9998C483.459 28.9998 482 30.3604 482 32.0369L482 42.6665Z'
          fill='#EE7C00'
          style={{transform: 'translateY(41.01px)', transitionDuration: '600ms', transitionDelay: '130ms'}}
        />
        <path
          opacity='0.4'
          d='M482 56.3333L496.667 56.3333L496.667 42.6666L482 42.6666L482 56.3333Z'
          fill='#EE7C00'
          style={{transform: 'translateY(27.34px)', transitionDuration: '400ms', transitionDelay: '130ms'}}
        />
        <path
          opacity='0.2'
          d='M496.667 56.3333L482 56.3333L482 69.2392C482 69.6599 482.365 70 482.817 70L493.407 70C495.208 70 496.667 68.6394 496.667 66.963L496.667 56.3333Z'
          fill='#EE7C00'
          style={{transform: 'translateY(13.67px)', transitionDuration: '200ms', transitionDelay: '130ms'}}
        />
      </g>

      <g opacity='0.4'>
        <path
          opacity='0.6'
          d='M173.667 27.6667L160 27.6667L160 14.7609C160 14.3402 160.34 14.0001 160.761 14.0001L170.63 14.0001C172.308 14.0001 173.667 15.3607 173.667 17.0371L173.667 27.6667Z'
          fill='#EE7C00'
          style={{transform: 'translateY(41.01px)', transitionDuration: '600ms', transitionDelay: '200ms'}}
        />
        <path
          opacity='0.4'
          d='M173.667 41.3335L160 41.3335L160 27.6668L173.667 27.6668L173.667 41.3335Z'
          fill='#EE7C00'
          style={{transform: 'translateY(27.34px)', transitionDuration: '400ms', transitionDelay: '200ms'}}
        />
        <path
          opacity='0.2'
          d='M160 41.3333L173.667 41.3333L173.667 54.2392C173.667 54.6599 173.327 55 172.906 55L163.037 55C161.359 55 160 53.6394 160 51.963L160 41.3333Z'
          fill='#EE7C00'
          style={{transform: 'translateY(13.67px)', transitionDuration: '200ms', transitionDelay: '200ms'}}
        />
      </g>

      <g opacity='0.4'>
        <path
          opacity='0.6'
          d='M506.667 27.6667L521.333 27.6667L521.333 14.7609C521.333 14.3402 520.968 14.0001 520.517 14.0001L509.926 14.0001C508.125 14.0001 506.667 15.3607 506.667 17.0371L506.667 27.6667Z'
          fill='#EE7C00'
          style={{transform: 'translateY(41.01px)', transitionDuration: '540ms', transitionDelay: '180ms'}}
        />
        <path
          opacity='0.4'
          d='M506.667 41.3335L521.333 41.3335L521.333 27.6668L506.667 27.6668L506.667 41.3335Z'
          fill='#EE7C00'
          style={{transform: 'translateY(27.34px)', transitionDuration: '360ms', transitionDelay: '180ms'}}
        />
        <path
          opacity='0.2'
          d='M521.333 41.3333L506.667 41.3333L506.667 54.2392C506.667 54.6599 507.032 55 507.483 55L518.074 55C519.875 55 521.333 53.6394 521.333 51.963L521.333 41.3333Z'
          fill='#EE7C00'
          style={{transform: 'translateY(13.67px)', transitionDuration: '180ms', transitionDelay: '180ms'}}
        />
      </g>
    </svg>
  )
}

export default Squares
