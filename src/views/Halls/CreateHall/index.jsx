import './style.css'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { StopLoading, StartLoading } from 'src/services/action/loading_action'
import { CButton, CCol, CForm, CFormInput, CNav, CNavItem, CNavLink, CSpinner, CTabContent, CTabPane } from "@coreui/react"

const CreateHall = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector(st => st.Loading_reducer.loading)
    const [activeKey, setActiveKey] = useState(1)
    const [validated, setValidated] = useState(false)
    const [file, setFile] = useState()
    const [blob, setBlob] = useState()
    const [details, setDetails] = useState({
        country: '',
        country_en: '',
        country_ru: '',
        location: '',
        location_en: '',
        location_ru: '',
        place: '',
        place_en: '',
        place_ru: '',
        hall: '',
        hall_en: '',
        hall_ru: '',
    })
    const [errors, setErrors] = useState({
        country_en: '',
        country_ru: '',
        location_en: '',
        location_ru: '',
        place_en: '',
        place_ru: '',
        hall_en: '',
        hall_ru: '',
    })

    function handleImageChange(e) {
        if (e.target.files.length) {
            setBlob(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity() !== false) {
            dispatch(StartLoading())
            if (!details?.country_en?.length) {
                setErrors({ ...errors, country_en: 'Required field' })
            } else if (!details?.location_en?.length) {
                setErrors({ ...errors, country_en: '', location_en: 'Required field' })
            } else if (!details?.place_en?.length) {
                setErrors({ ...errors, country_en: '', location_en: '', place_en: 'Required field' })
            } else if (!details?.hall_en?.length) {
                setErrors({ ...errors, country_en: '', location_en: '', place_en: '', hall_en: 'Required field' })
            } else if (!details?.country_ru?.length) {
                setErrors({ ...errors, country_en: '', location_en: '', place_en: '', hall_en: '', country_ru: 'Required field' })
            } else if (!details?.location_ru?.length) {
                setErrors({ ...errors, country_en: '', location_en: '', place_en: '', hall_en: '', country_ru: '', location_ru: 'Required field' })
            } else if (!details?.place_ru?.length) {
                setErrors({ ...errors, country_en: '', location_en: '', place_en: '', hall_en: '', country_ru: '', location_ru: '', place_ru: 'Required field' })
            } else if (!details?.hall_ru?.length) {
                setErrors({ ...errors, country_en: '', location_en: '', place_en: '', hall_en: '', country_ru: '', location_ru: '', place_ru: '', hall_ru: 'Required field' })
            } else {
                setErrors({
                    country_en: '',
                    country_ru: '',
                    location_en: '',
                    location_ru: '',
                    place_en: '',
                    place_ru: '',
                    hall_en: '',
                    hall_ru: '',
                })
                const myHeaders = new Headers()
                myHeaders.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
                const formdata = new FormData()
                formdata.append("image", file)
                formdata.append("country", details?.country)
                formdata.append("country_en", details?.country_en)
                formdata.append("country_ru", details?.country_ru)
                formdata.append("location", details?.location)
                formdata.append("location_en", details?.location_en)
                formdata.append("location_ru", details?.location_ru)
                formdata.append("place", details?.place)
                formdata.append("place_en", details?.place_en)
                formdata.append("place_ru", details?.place_ru)
                formdata.append("hall", details?.hall)
                formdata.append("hall_en", details?.hall_en)
                formdata.append("hall_ru", details?.hall_ru)

                fetch(`${process.env.REACT_APP_HOSTNAME}/createHall`, {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow',
                    headers: myHeaders,
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            dispatch(StopLoading())
                            alert('Դահլիճը ստեղծված է')
                            navigate('/all-halls')
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        setValidated(true)
    }

    return (<>
        {loading
            ? <Loading />
            : <div>
                <CNav variant="tabs" role="tablist">
                    <CNavItem role="presentation" >
                        <CNavLink
                            active={activeKey === 1}
                            component="button"
                            role="tab"
                            aria-controls="home-tab-pane"
                            aria-selected={activeKey === 1}
                            onClick={() => setActiveKey(1)}
                        >
                            Հայերեն
                        </CNavLink>
                    </CNavItem>
                    <CNavItem role="presentation">
                        <CNavLink
                            style={errors?.country_en?.length > 0 || errors?.location_en?.length > 0 || errors?.place_en?.length > 0 || errors?.hall_en?.length > 0 ? { border: '1px solid red' } : {}}
                            active={activeKey === 2}
                            component="button"
                            role="tab"
                            aria-controls="profile-tab-pane"
                            aria-selected={activeKey === 2}
                            onClick={() => setActiveKey(2)}
                        >
                            English
                        </CNavLink>
                    </CNavItem>
                    <CNavItem role="presentation">
                        <CNavLink
                            style={errors?.country_ru?.length > 0 || errors?.location_ru?.length > 0 || errors?.place_ru?.length > 0 || errors?.hall_ru?.length > 0 ? { border: '1px solid red' } : {}}
                            active={activeKey === 3}
                            component="button"
                            role="tab"
                            aria-controls="contact-tab-pane"
                            aria-selected={activeKey === 3}
                            onClick={() => setActiveKey(3)}
                        >
                            Русский
                        </CNavLink>
                    </CNavItem>
                </CNav>
                <CTabContent>
                    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1} style={{ marginTop: '20px' }}>
                        <CForm
                            className="row g-3 needs-validation"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <CCol md={4}>
                                <div className='createHallImage'>
                                    <img alt='' src={blob} className='eventImage' />
                                </div>
                                <CFormInput
                                    type="file"
                                    defaultValue=''
                                    onChange={handleImageChange}
                                    feedbackInvalid='Պարտադիր դաշտ'
                                    required
                                />
                            </CCol>
                            <CCol md={4} /><CCol md={4} />
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    defaultValue=''
                                    onChange={(e) => setDetails({ ...details, country: e.target.value })}
                                    feedbackInvalid='Պարտադիր դաշտ'
                                    label='Երկիր'
                                    required
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    defaultValue=''
                                    onChange={(e) => setDetails({ ...details, location: e.target.value })}
                                    feedbackInvalid='Պարտադիր դաշտ'
                                    label='Քաղաք'
                                    required
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    defaultValue=''
                                    onChange={(e) => setDetails({ ...details, place: e.target.value })}
                                    feedbackInvalid='Պարտադիր դաշտ'
                                    label='Վայր'
                                    required
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    defaultValue=''
                                    onChange={(e) => setDetails({ ...details, hall: e.target.value })}
                                    feedbackInvalid='Պարտադիր դաշտ'
                                    label='Դահլիճ'
                                    required
                                />
                            </CCol>
                            {(errors?.country_en?.length > 0 || errors?.location_en?.length > 0 || errors?.place_en?.length > 0 || errors?.hall_en?.length > 0 || errors?.country_ru?.length > 0 || errors?.country_ru?.length > 0 || errors?.location_ru?.length > 0 || errors?.place_ru?.length > 0 || errors?.hall_ru?.length > 0) && <span style={{ color: 'red' }}>Error</span>}
                            <CCol xs={12}>
                                <CButton disabled={loading} type="submit">
                                    {loading && <CSpinner component="span" size="sm" aria-hidden="true" />}
                                    Ստեղծել
                                </CButton>
                            </CCol>
                        </CForm>
                    </CTabPane>
                    <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2} style={{ marginTop: '20px' }}>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue=''
                                onChange={(e) => setDetails({ ...details, country_en: e.target.value })}
                                feedbackInvalid='Required field'
                                label='Country'
                                required
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue=''
                                onChange={(e) => setDetails({ ...details, location_en: e.target.value })}
                                feedbackInvalid='Required field'
                                label='City'
                                required
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue=''
                                onChange={(e) => setDetails({ ...details, place_en: e.target.value })}
                                feedbackInvalid='Required field'
                                label='Place'
                                required
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue=''
                                onChange={(e) => setDetails({ ...details, hall_en: e.target.value })}
                                feedbackInvalid='Required field'
                                label='Hall'
                                required
                            />
                        </CCol>
                    </CTabPane>
                    <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3} style={{ marginTop: '20px' }}>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue=''
                                onChange={(e) => setDetails({ ...details, country_ru: e.target.value })}
                                feedbackInvalid='Обязательное поле:'
                                label='Страна'
                                required
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue=''
                                onChange={(e) => setDetails({ ...details, location_ru: e.target.value })}
                                feedbackInvalid='Обязательное поле:'
                                label='Город'
                                required
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue=''
                                onChange={(e) => setDetails({ ...details, place_ru: e.target.value })}
                                feedbackInvalid='Обязательное поле:'
                                label='Место'
                                required
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue=''
                                onChange={(e) => setDetails({ ...details, hall_ru: e.target.value })}
                                feedbackInvalid='Обязательное поле:'
                                label='Зал'
                                required
                            />
                        </CCol>
                    </CTabPane>
                </CTabContent>
            </div>
        }
    </>)
}
export default CreateHall
