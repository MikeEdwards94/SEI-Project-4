import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import BarIndex from './bars/BarIndex'
import EventIndex from './events/EventIndex'
import Deals from './deals/Deals'
import Registration from './auth/Registration'
import Login from './auth/Login'
import BarShow from './bars/BarShow'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/bars" >
          <BarIndex/>
        </Route>
        <Route path="/bars/:id" >
          <BarShow/>
        </Route>

        <Route exact path="/events" >
          <EventIndex/>
        </Route>

        <Route exact path="/deals" >
          <Deals/>
        </Route>

        <Route exact path="/register" >
          <Registration/>
        </Route>

        <Route exact path="/login" >
          <Login/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
