import React from 'react';
import style from './App.module.css'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import List from '../../features/Freelancers/List'

function App() {
  return (
    <div className={style.app}>
      <Header/>
      <div>
        <h2 className={style.tagline}>Find the best HubSpot freelancer</h2>
        <List/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
