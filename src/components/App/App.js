import React from 'react'
import style from './App.module.css'

import {useSelector} from 'react-redux'

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import About from '@components/About'
import Login from '@features/Login'
import List from '@features/Freelancers/List'

function App() {
  const signedUp = useSelector(store => store.profile.status.signedUp)

  return (
    <Router>
      <div className={style.app}>
        <Header/>
        <Switch>
          <Route path='/about'>
            <About/>
          </Route>
          <Route path='/login'>
            {signedUp ? <Redirect to='/'/>
            : <Login/>}
          </Route>
          <Route path='/'>
            <h2 className={style.tagline}>Find the best HubSpot freelancer</h2>
            <List/>
          </Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
