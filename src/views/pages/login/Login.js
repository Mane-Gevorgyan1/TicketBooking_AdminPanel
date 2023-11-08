import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import './style.css'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { SignIn } from 'src/services/action/auth_action'

const Login = () => {
  const dispatch = useDispatch()
  const serverError = useSelector(st => st.Auth_reducer.error)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)

  function handleLogin(event) {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      dispatch(SignIn(username, password))
    }
    setValidated(true)
  }

  return (
    <div className='loginBg'>
      <CRow className="justify-content-center">
        <CCol>
          <CCard className="p-4 cardik">
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
            >
              <h1>Login</h1>
              <p className="text-medium-emphasis">Sign In to your account</p>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </CInputGroup>
              <CInputGroup className="mb-4">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </CInputGroup>
              <span className='errorMessage'>{serverError}</span>
              <CRow>
                <CCol xs={6}>
                  <CButton color="primary" className="px-4" onClick={handleLogin}>
                    Login
                  </CButton>
                </CCol>
                <CCol xs={8} className="text-right">
                  <CButton color="link" className="px-0">
                    Forgot password?
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Login