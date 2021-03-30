import style from './Clipboard.module.css'

const Clipboard = ({complete}) => {
  return(
    <svg className={`${style.clipboard} ${complete ? style.complete : ''}`} width="116" height="116" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#clipboard_filter0_d)">
        <path fillRule="evenodd" clipRule="evenodd" d="M36.052 23.2739C34.5169 23.6852 33.6059 25.2631 34.0173 26.7981L34.5732 28.8728L23.9529 31.7185C20.8828 32.5411 19.0608 35.6969 19.8834 38.767L34.2447 92.3638C35.0673 95.4339 38.223 97.2559 41.2932 96.4333L85.1828 84.6731C88.2529 83.8504 90.0749 80.6947 89.2522 77.6246L74.891 24.0278C74.0684 20.9576 70.9126 19.1357 67.8425 19.9583L57.2233 22.8037L56.6674 20.729C56.2561 19.194 54.6783 18.283 53.1432 18.6943L36.052 23.2739Z" fill="url(#clipboard_paint0_linear)"/>
        <path d="M34.5732 28.8728L34.9455 30.2625L36.3353 29.8902L35.9629 28.5004L34.5732 28.8728ZM23.9529 31.7185L23.5805 30.3288L23.9529 31.7185ZM57.2233 22.8037L55.8336 23.1761L56.206 24.5658L57.5957 24.1935L57.2233 22.8037ZM35.407 26.4257C35.2013 25.6582 35.6568 24.8693 36.4244 24.6636L35.6796 21.8842C33.377 22.5011 32.0105 24.8679 32.6275 27.1705L35.407 26.4257ZM35.9629 28.5004L35.407 26.4257L32.6275 27.1705L33.1834 29.2452L35.9629 28.5004ZM24.3253 33.1082L34.9455 30.2625L34.2008 27.4831L23.5805 30.3288L24.3253 33.1082ZM21.2732 38.3946C20.6562 36.092 22.0227 33.7252 24.3253 33.1082L23.5805 30.3288C19.7428 31.3571 17.4654 35.3017 18.4937 39.1394L21.2732 38.3946ZM35.6344 91.9914L21.2732 38.3946L18.4937 39.1394L32.8549 92.7362L35.6344 91.9914ZM40.9208 95.0435C38.6182 95.6605 36.2514 94.294 35.6344 91.9914L32.8549 92.7362C33.8832 96.5739 37.8279 98.8513 41.6655 97.823L40.9208 95.0435ZM84.8104 83.2833L40.9208 95.0435L41.6655 97.823L85.5552 86.0628L84.8104 83.2833ZM87.8625 77.997C88.4795 80.2996 87.113 82.6664 84.8104 83.2833L85.5552 86.0628C89.3928 85.0345 91.6703 81.0899 90.642 77.2522L87.8625 77.997ZM73.5013 24.4001L87.8625 77.997L90.642 77.2522L76.2807 23.6554L73.5013 24.4001ZM68.2149 21.348C70.5175 20.7311 72.8843 22.0975 73.5013 24.4001L76.2807 23.6554C75.2524 19.8177 71.3078 17.5403 67.4701 18.5686L68.2149 21.348ZM57.5957 24.1935L68.2149 21.348L67.4701 18.5686L56.851 21.414L57.5957 24.1935ZM55.2777 21.1014L55.8336 23.1761L58.6131 22.4313L58.0572 20.3567L55.2777 21.1014ZM53.5156 20.0841C54.2831 19.8784 55.072 20.3339 55.2777 21.1014L58.0572 20.3567C57.4402 18.0541 55.0734 16.6876 52.7708 17.3046L53.5156 20.0841ZM36.4244 24.6636L53.5156 20.0841L52.7708 17.3046L35.6796 21.8842L36.4244 24.6636Z" fill="white"/>
      </g>
      <rect x="34.5669" y="45.727" width="33.4988" height="3.34988" rx="1.67494" transform="rotate(-15 34.5669 45.727)" fill="white"/>
      <rect x="37.1685" y="55.4355" width="33.4988" height="3.34988" rx="1.67494" transform="rotate(-15 37.1685 55.4355)" fill="white"/>
      <rect x="40.4121" y="65.7458" width="20.0993" height="3.34988" rx="1.67494" transform="rotate(-15 40.4121 65.7458)" fill="white"/>
      <path d="M87.9137 90.9299C95.3847 88.928 99.8183 81.2487 97.8165 73.7777C95.8146 66.3067 88.1353 61.873 80.6643 63.8749C73.1933 65.8767 68.7596 73.556 70.7615 81.027C72.7633 88.4981 80.4426 92.9317 87.9137 90.9299Z" fill="url(#clipboard_paint1_linear)" stroke="white" strokeWidth="2.87753" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M82.6616 71.3355L85.9139 83.4733" stroke="white" strokeWidth="2.87753" strokeLinecap="round" strokeLinejoin="round" className={style.plusVertical}/>
      <path d="M78.2192 79.029L90.357 75.7767" stroke="white" strokeWidth="2.87753" strokeLinecap="round" strokeLinejoin="round" className={style.plusHorizontal}/>
      <defs>
        <filter id="clipboard_filter0_d" x="3.82094" y="4.65869" width="100.193" height="110.853" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="4.31629"/>
          <feGaussianBlur stdDeviation="5.75506"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        <linearGradient id="clipboard_paint0_linear" x1="47.8483" y1="33.7403" x2="63.238" y2="90.5532" gradientUnits="userSpaceOnUse">
          <stop offset="0.366841" stopColor="#FC8B10"/>
          <stop offset="1" stopColor="#FFB360"/>
        </linearGradient>
        <linearGradient id="clipboard_paint1_linear" x1="73.8101" y1="99.0625" x2="89.722" y2="67.2386" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF2126"/>
          <stop offset="0.6875" stopColor="#EE7C00"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Clipboard
