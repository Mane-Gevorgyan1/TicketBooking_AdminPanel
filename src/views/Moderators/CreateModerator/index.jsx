import { Checkbox } from 'antd'
import { useState } from 'react'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { CreateUser } from 'src/services/action/user_action'
import { CButton, CCardText, CCol, CForm, CFormInput, CListGroup, CListGroupItem } from '@coreui/react'

const CreateModerator = () => {
    const dispatch = useDispatch()
    const loading = useSelector(st => st.Loading_reducer.loading)
    const [validated, setValidated] = useState(false)
    const [user, setUser] = useState({
        name: '',
        username: '',
        password: '',
        accessToEvents: false,
        accessToCategories: false,
        accessToSponsors: false,
        accessToHalls: false,
        accessToSessions: false,
        accessToAds: false,
        accessToFeedback: false,
        accessToModerators: false,
    })

    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity() !== false) {
            dispatch(CreateUser(user))
        }
        setValidated(true)
    }

    return (<>
        {loading
            ? <Loading />
            : <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <CCol md={4}>
                    <CFormInput
                        label='Անուն'
                        value={user?.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        required
                        feedbackInvalid='Պարտադիր դաշտ'
                    />
                </CCol>
                <CCol md={8} />
                <CCol md={4}>
                    <CFormInput
                        label='Մուտքանուն'
                        value={user?.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        required
                        feedbackInvalid='Պարտադիր դաշտ'
                    />
                </CCol>
                <CCol md={4}>
                    <CFormInput
                        label='Գաղտնաբառ (min 6)'
                        value={user?.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        type='password'
                        required
                        feedbackInvalid='Պարտադիր դաշտ'
                        minLength={6}
                    />
                </CCol>
                <CCol md={4} />
                <CCol md={4}>
                    <CListGroup flush>
                        <CListGroup flush>
                            <p>հասանելիություն</p>
                            <CListGroupItem>
                                <div className='moderatorSettings'>
                                    <CCardText>Բաժիններ</CCardText>
                                    <Checkbox checked={user?.accessToCategories} onChange={elm => setUser({ ...user, accessToCategories: elm?.target?.checked })}></Checkbox>
                                </div>
                            </CListGroupItem>
                            <CListGroupItem>
                                <div className='moderatorSettings'>
                                    <CCardText>Միջոցառումներ</CCardText>
                                    <Checkbox checked={user?.accessToEvents} onChange={elm => setUser({ ...user, accessToEvents: elm?.target?.checked })}></Checkbox>
                                </div>
                            </CListGroupItem>
                            <CListGroupItem>
                                <div className='moderatorSettings'>
                                    <CCardText>Սեանսներ</CCardText>
                                    <Checkbox checked={user?.accessToSessions} onChange={elm => setUser({ ...user, accessToSessions: elm?.target?.checked })}></Checkbox>
                                </div>
                            </CListGroupItem>
                            <CListGroupItem>
                                <div className='moderatorSettings'>
                                    <CCardText>Դահլիճներ</CCardText>
                                    <Checkbox checked={user?.accessToHalls} onChange={elm => setUser({ ...user, accessToHalls: elm?.target?.checked })}></Checkbox>
                                </div>
                            </CListGroupItem>
                            <CListGroupItem>
                                <div className='moderatorSettings'>
                                    <CCardText>Հովանավորներ</CCardText>
                                    <Checkbox checked={user?.accessToSponsors} onChange={elm => setUser({ ...user, accessToSponsors: elm?.target?.checked })}></Checkbox>
                                </div>
                            </CListGroupItem>
                            <CListGroupItem>
                                <div className='moderatorSettings'>
                                    <CCardText>Գովազդ</CCardText>
                                    <Checkbox checked={user?.accessToAds} onChange={elm => setUser({ ...user, accessToAds: elm?.target?.checked })}></Checkbox>
                                </div>
                            </CListGroupItem>
                            <CListGroupItem>
                                <div className='moderatorSettings'>
                                    <CCardText>Մոդերատորներ</CCardText>
                                    <Checkbox checked={user?.accessToModerators} onChange={elm => setUser({ ...user, accessToModerators: elm?.target?.checked })}></Checkbox>
                                </div>
                            </CListGroupItem>
                            <CListGroupItem>
                                <div className='moderatorSettings'>
                                    <CCardText>Հետադարձ կապ</CCardText>
                                    <Checkbox checked={user?.accessToFeedback} onChange={elm => setUser({ ...user, accessToFeedback: elm?.target?.checked })}></Checkbox>
                                </div>
                            </CListGroupItem>
                        </CListGroup>
                    </CListGroup>
                </CCol>
                <CCol md={8} />
                <CCol>
                    <CButton type='submit'>Ստեղծել</CButton>
                </CCol>
            </CForm>
        }
    </>)
}

export default CreateModerator