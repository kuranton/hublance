import style from './Footer.module.css'
import petrovDigitalLogo from './petrovDigitalLogo.svg'

const Footer = ({playing, transparent}) => (
  <footer className={style.footer}>
    <div className={style.wrap}>
      <span className={style.legal}>
        &copy; Copyright Hublance {new Date().getFullYear()}. All rights reserved
      </span>

      <div className={style.created}>
        <span>Created by:</span>
        <a className={style.petrovDigitalLink} href='https://petrovdigital.io/' target='_blank' rel='noopener noreferrer'>
          <img className={style.petrovDigital} src={petrovDigitalLogo} alt='Petrov Digital'/>
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
