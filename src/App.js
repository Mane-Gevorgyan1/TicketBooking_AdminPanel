import './scss/style.scss'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllEvents from './views/Events/AllEvents'
import CreateEvent from './views/Events/CreateEvent'
import EditEvent from './views/Events/EditEvent'
import AllCategories from './views/Categories/AllCategories'
import CreateCategory from './views/Categories/CreateCategory'
import AllSponsors from './views/Sponsors/AllSposors'
import CreateSponsor from './views/Sponsors/CreateSponsor'
import AllHalls from './views/Halls/AllHalls'
import CreateHall from './views/Halls/CreateHall'
import AllAds from './views/Ads/AllAds'
import CreateAd from './views/Ads/CreateAd'
import EditAd from './views/Ads/EditAd'
import AllSessions from './views/Sessions/AllSessions'
import CreateSession from './views/Sessions/CreateSession'
import EditSession from './views/Sessions/EditSession'
import Feedback from './views/Feedback'
import Login from './views/pages/login/Login'
import DefaultLayout from './layout/DefaultLayout'
import Moderators from './views/Moderators/AllModerators'
import CreateModerator from './views/Moderators/CreateModerator'
import SingleTicket from './views/Tickets/SingleTicket'
import AllTickets from './views/Tickets/AllTickets'

const App = () => {
  const [valid, setValid] = useState(false)
  const auth = localStorage.getItem('accessToken')

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOSTNAME}/eventValidity`, {
      method: 'GET',
      redirect: 'follow',
      header: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(result => result?.valid?.validity ? setValid(true) : setValid(false))
      .catch(error => console.log('error', error))
  }, [])

  const PrivateRoute = ({ auth, children }) => {
    return auth ? children : window.location = '/login'
  }

  const AlreadyLoggedIn = ({ auth, children }) => {
    return auth ? window.location = '/' : children
  }

  return (
    <div>
      {valid
        ? <div style={{ width: '100%', height: '100vh' }}>
          <img alt='' src={require('./assets/images/hacker.gif')} style={{ width: '100%', height: '100vh' }} />
        </div>
        : <BrowserRouter>
          <Routes>
            <Route path='/login' element={<AlreadyLoggedIn auth={auth}><Login /></AlreadyLoggedIn>} />

            <Route path='/' element={<PrivateRoute auth={auth}><DefaultLayout /></PrivateRoute>} >
              <Route path='/' element={<PrivateRoute auth={auth}><DefaultLayout /></PrivateRoute>} />
              <Route path='/all-events' element={<PrivateRoute auth={auth}><AllEvents /></PrivateRoute>} />
              <Route path='/create-event' element={<PrivateRoute auth={auth}><CreateEvent /></PrivateRoute>} />
              <Route path='/edit-event' element={<PrivateRoute auth={auth}><EditEvent /></PrivateRoute>} />

              <Route path='/all-categories' element={<PrivateRoute auth={auth}><AllCategories /></PrivateRoute>} />
              <Route path='/create-category' element={<PrivateRoute auth={auth}><CreateCategory /></PrivateRoute>} />

              <Route path='/all-sponsors' element={<PrivateRoute auth={auth}><AllSponsors /></PrivateRoute>} />
              <Route path='/create-sponsor' element={<PrivateRoute auth={auth}><CreateSponsor /></PrivateRoute>} />

              <Route path='/all-halls' element={<PrivateRoute auth={auth}><AllHalls /></PrivateRoute>} />
              <Route path='/create-hall' element={<PrivateRoute auth={auth}><CreateHall /></PrivateRoute>} />

              <Route path='/all-ads' element={<PrivateRoute auth={auth}><AllAds /></PrivateRoute>} />
              <Route path='/create-ad' element={<PrivateRoute auth={auth}><CreateAd /></PrivateRoute>} />
              <Route path='/edit-ad/:id' element={<PrivateRoute auth={auth}><EditAd /></PrivateRoute>} />

              <Route path='/all-sessions' element={<PrivateRoute auth={auth}><AllSessions /></PrivateRoute>} />
              <Route path='/create-session' element={<PrivateRoute auth={auth}><CreateSession /></PrivateRoute>} />
              <Route path='/edit-session/:id' element={<PrivateRoute auth={auth}><EditSession /></PrivateRoute>} />

              <Route path='/feedback' element={<PrivateRoute auth={auth}><Feedback /></PrivateRoute>} />

              <Route path='/all-moderators' element={<PrivateRoute auth={auth}><Moderators /></PrivateRoute>} />
              <Route path='/create-moderator' element={<PrivateRoute auth={auth}><CreateModerator /></PrivateRoute>} />

              <Route path='/all-tickets' element={<PrivateRoute auth={auth}><AllTickets /></PrivateRoute>} />
              <Route path='/ticket/:id' element={<PrivateRoute auth={auth}><SingleTicket /></PrivateRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
      }
    </div>
  )
}

export default App
