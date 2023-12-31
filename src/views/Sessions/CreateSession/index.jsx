import './style.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllHalls } from 'src/services/action/hall_action'
import { GetAllSessionEvents } from 'src/services/action/session_action'
import { StopLoading, StartLoading } from 'src/services/action/loading_action'
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CCol, CForm, CFormInput, CSpinner } from '@coreui/react'

const CreateSession = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const events = useSelector(st => st.Session_reducer.events)
    const halls = useSelector(st => st.Hall_reducer.halls)
    const loading = useSelector(st => st.Loading_reducer.loading)
    const [validated, setValidated] = useState(false)
    const [openHalls, setOpenHalls] = useState(false)
    const [openEvents, setOpenEvents] = useState(false)
    const [details, setDetails] = useState({
        event: '',
        hall: '',
        priceStart: '',
        priceEnd: '',
        date: '',
        time: '',
    })
    const [errors, setErrors] = useState({
        event: '',
        hall: '',
        priceStart: '',
        priceEnd: '',
        date: '',
        time: '',
    })

    useEffect(() => {
        dispatch(GetAllSessionEvents())
        dispatch(GetAllHalls())
    }, [dispatch])

    function handleRowPriceChange(event, section, row) {
        let item = { ...details }
        item.hall.price[section].price[row].price = event
        setDetails(item)
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity() !== false) {
            dispatch(StartLoading())
            if (!Object.keys(details?.hall).length > 0) {
                setErrors({ ...errors, hall: ' ' })
            } else if (!Object.keys(details?.event).length > 0) {
                setErrors({ ...errors, hall: '', event: ' ' })
            } else if (!details?.priceStart?.length) {
                setErrors({ ...errors, hall: '', event: '', priceStart: ' ' })
            } else if (!details?.priceEnd?.length) {
                setErrors({ ...errors, hall: '', event: '', priceStart: '', priceEnd: ' ' })
            } else if (!details?.date?.length) {
                setErrors({ ...errors, hall: '', event: '', priceStart: '', priceEnd: '', date: ' ' })
            } else if (!details?.time?.length) {
                setErrors({ ...errors, hall: '', event: '', priceStart: '', priceEnd: '', date: '', time: ' ' })
            } else {
                setErrors({
                    event: '',
                    hall: '',
                    priceStart: '',
                    priceEnd: '',
                    date: '',
                    time: ''
                })
                const myHeaders = new Headers()
                myHeaders.append('Content-Type', 'application/json')
                myHeaders.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
                await fetch(`${process.env.REACT_APP_HOSTNAME}/createSession`, {
                    method: 'POST',
                    body: JSON.stringify({
                        hallId: details?.hall?._id,
                        eventId: details?.event?._id,
                        priceStart: details?.priceStart,
                        priceEnd: details?.priceEnd,
                        date: details?.date,
                        time: details?.time,
                        price: details?.hall?.price
                    }),
                    redirect: 'follow',
                    headers: myHeaders,
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            dispatch(StopLoading())
                            alert('Սեանսը ստեղծված է')
                            navigate('/all-sessions')
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
                <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <div className='select'>
                        <span>Միջոցառում</span>
                        <div className='selectedField' style={{ cursor: 'pointer' }} onClick={() => {
                            setOpenEvents(!openEvents)
                            setOpenHalls(false)
                        }}>
                            {details?.event ? <span>{details?.event?.title}</span> : <span>Ընտրել</span>}
                        </div>
                        <div className='selectDropdown' style={openEvents ? { display: 'flex' } : { display: 'none' }}>
                            {events?.length > 0
                                ? events?.map((e, i) => (
                                    <div key={i} className='eachDropdown'
                                        onClick={() => {
                                            setDetails({ ...details, event: e })
                                            setOpenEvents(false)
                                        }}
                                        style={details?.event === e ? { background: 'rgb(128 128 128 / 21%)' } : {}}
                                    >
                                        <img alt='' src={`${process.env.REACT_APP_IMAGE}/${e?.image}`} />
                                        <p>{e?.title}</p>
                                    </div>
                                ))
                                : <span>Միջոցառումներ չկան</span>
                            }
                        </div>
                    </div>
                    <div className='select'>
                        <span>Դահլիճ</span>
                        <div className='selectedField' style={{ cursor: 'pointer' }} onClick={() => {
                            setOpenHalls(!openHalls)
                            setOpenEvents(false)
                        }}>
                            {details?.hall ? <span>{details?.hall?.place}, {details?.hall?.hall}</span> : <span>Ընտրել</span>}
                        </div>
                        <div className='selectDropdown' style={openHalls ? { display: 'flex' } : { display: 'none' }}>
                            {halls?.length > 0
                                ? halls?.map((e, i) => (
                                    <div key={i} className='eachDropdown'
                                        onClick={() => {
                                            setDetails({ ...details, hall: e })
                                            setOpenHalls(false)
                                        }}
                                        style={details?.hall === e ? { background: 'rgb(128 128 128 / 21%)' } : {}}
                                    >
                                        <img alt='' src={`${process.env.REACT_APP_IMAGE}/${e?.image}`} />
                                        <p>{e?.place}, {e?.hall}</p>
                                    </div>
                                ))
                                : <span>Դահլիճներ չկան</span>
                            }
                        </div>
                    </div>

                    {details?.hall && <img alt='' src={`${process.env.REACT_APP_IMAGE}/${details?.hall?.sectionImage}`} />}

                    <CAccordion flush className='sessionAccordion'>
                        {details?.hall?.price?.length > 0 && details?.hall?.price?.map((e, i) => (
                            <CAccordionItem itemKey={i + 1} key={i}>
                                {e?.price?.length > 0 && e?.price[0]?.type
                                    ? <CAccordionHeader>Գինը</CAccordionHeader>
                                    : <CAccordionHeader>Մաս {i + 1}</CAccordionHeader>
                                }
                                {e?.price?.length > 0 && e?.price?.map((e, j) => (
                                    <CAccordionBody key={j}>
                                        {e?.type
                                            ? <label> {e.type} &nbsp;</label>
                                            : <label>Շարք {e.row} &nbsp;</label>
                                        }
                                        <input value={e?.price} type='number' onChange={(event) => handleRowPriceChange(event.target.value, i, j)} />
                                    </CAccordionBody>
                                ))}
                            </CAccordionItem>
                        ))}
                    </CAccordion>

                    <div className='select'>
                        <span>Օր</span>
                        <input
                            className='datetime'
                            type='date'
                            value={details?.date}
                            onChange={(e) => setDetails({ ...details, date: e.target.value })}
                        />
                    </div>
                    <div className='select'>
                        <span>Ժամ</span>
                        <input
                            className='datetime'
                            type='time'
                            value={details?.hour}
                            onChange={(e) => setDetails({ ...details, time: e.target.value })}
                        />
                    </div>
                    <div className='select'>
                        <CFormInput
                            type="number"
                            defaultValue={details?.priceStart}
                            label="Արժեքը սկսած"
                            feedbackInvalid='Պարտադիր դաշտ'
                            required
                            onChange={(e) => setDetails({ ...details, priceStart: e.target.value })}
                        />
                    </div>
                    <div className='select'>
                        <CFormInput
                            type="number"
                            defaultValue={details?.priceEnd}
                            label="Արժեքը մինչև"
                            feedbackInvalid='Պարտադիր դաշտ'
                            required
                            onChange={(e) => setDetails({ ...details, priceEnd: e.target.value })}
                        />
                    </div>
                    <CCol xs={12}>
                        <CButton disabled={loading} type="submit">
                            {loading && <CSpinner component="span" size="sm" aria-hidden="true" />}
                            Ստեղծել
                        </CButton>
                    </CCol>
                </CForm>
            </div>
        }
    </>)
}

export default CreateSession