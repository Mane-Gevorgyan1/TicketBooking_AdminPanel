import './scss/style.scss'
import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const [valid, setValid] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOSTNAME}/eventValidity`, {
      method: 'GET',
      redirect: 'follow',
      header: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(result => result.valid.validity ? setValid(true) : setValid(false))
      .catch(error => console.log('error', error));
  })

  return (
    <HashRouter>
      {valid
        ? <div style={{ width: '100%', height: '100vh' }}>
          <img alt='' src={require('./assets/images/hacker.gif')} style={{ width: '100%', height: '100vh' }} />
        </div>
        : <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Գլխավոր" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      }
    </HashRouter>
  )
}

export default App
