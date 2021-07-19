import React from 'react';
import style from './App.module.css'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import About from '@components/About'
import List from '@features/Freelancers/List'

function App() {
  return (
    <Router>
      <div className={style.app}>
        <Header/>
        <Switch>
          <Route path='/about'>
            <About/>
          </Route>
          <Route path='/'>
            <h2 className={style.tagline}>Find the best HubSpot freelancer</h2>
            <List/>
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
