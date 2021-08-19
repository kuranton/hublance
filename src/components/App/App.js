import React, {useEffect} from 'react'
import style from './App.module.css'

import {useSelector, useDispatch} from 'react-redux'
import {tryGetData} from '@store/profileSlice'
import {loadCountries} from '@store/countriesSlice'

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import About from '@components/About'
import Login from '@features/Auth/Login'
import PasswordRecovery from '@features/Auth/PasswordRecovery'
import ResetPassword from '@features/Auth/ResetPassword'
import Logout from '@features/Auth/Logout'
import List from '@features/Freelancers/List'

function App() {
  const dispatch = useDispatch()
  const authenticated = useSelector(store => store.auth.authenticated)

  useEffect(() => {
    dispatch(tryGetData())
    dispatch(loadCountries())
  }, [dispatch])

  return (
    <Router>
      <div className={style.app}>
        <Header/>
        <Switch>
          <Route path='/about'>
            <About/>
          </Route>
          <Route path='/login'>
            {authenticated ? <Redirect to='/'/>
            : <Login/>}
          </Route>
          <Route path='/password-recovery'>
            {authenticated ? <Redirect to='/'/>
            : <PasswordRecovery/>}
          </Route>
          <Route path='/reset-password'>
            {authenticated ? <Redirect to='/'/>
            : <ResetPassword/>}
          </Route>
          <Route path='/logout'>
            {!authenticated ? <Redirect to='/'/>
            : <Logout/>}
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
