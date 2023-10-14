import './style.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllSessionEvents, GetSingleSession } from 'src/services/action/session_action'
import { CButton, CCol, CForm, CFormInput } from '@coreui/react'
import { GetAllHalls } from 'src/services/action/hall_action'
import dayjs from 'dayjs';

const EditSession = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sessionId] = useState(window.location.href.split('/edit-session/')[1])
    const session = useSelector(st => st.Session_reducer.session)
    const events = useSelector(st => st.Session_reducer.events)
    const halls = useSelector(st => st.Hall_reducer.halls)
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
        dispatch(GetSingleSession(sessionId))
        dispatch(GetAllSessionEvents())
        dispatch(GetAllHalls())
    }, [dispatch, sessionId])

    useEffect(() => {
        if (Object.keys(session).length > 0) {
            setDetails({
                event: session?.eventId,
                hall: session?.hallId,
                priceStart: session?.priceStart,
                priceEnd: session?.priceEnd,
                date: session?.date?.split('T')[0],
                time: dayjs(`1970-01-01T${session?.time}:00`)?.format('A'),
            })
        }
    }, [session])

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            if (!details?.hall) {
                setErrors({ ...errors, hall: ' ' })
            } else if (!details?.event) {
                setErrors({ ...errors, hall: '', event: ' ' })
            } else if (!details?.priceStart) {
                setErrors({ ...errors, hall: '', event: '', priceStart: ' ' })
            } else if (!details?.priceEnd) {
                setErrors({ ...errors, hall: '', event: '', priceStart: '', priceEnd: ' ' })
            } else if (!details?.date) {
                setErrors({ ...errors, hall: '', event: '', priceStart: '', priceEnd: '', date: ' ' })
            } else if (!details?.hour) {
                setErrors({ ...errors, hall: '', event: '', priceStart: '', priceEnd: '', date: '', hour: ' ' })
            } else {
                setErrors({
                    event: '',
                    hall: '',
                    priceStart: '',
                    priceEnd: '',
                    date: '',
                    time: ''
                })
                const formdata = new FormData()
                formdata.append("hallId", details?.hall?._id)
                formdata.append("eventId", details?.event?._id)
                formdata.append("priceStart", details?.priceStart)
                formdata.append("priceEnd", details?.priceEnd)
                formdata.append("date", details?.date)
                formdata.append("time", details?.hour)
                // formdata.append("price",)

                fetch(`${process.env.REACT_APP_HOSTNAME}/createSession`, {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            navigate('/all-events')
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        setValidated(true)
    }

    return (
        <div>
            <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <div className='select'>
                    <span>Միջոցառում</span>
                    <div className='selectedField' onClick={() => {
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
                    <div className='selectedField' onClick={() => {
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
                    <CButton color="primary" type="submit">Փոփոխել</CButton>
                </CCol>
            </CForm>
        </div>
    )
}

export default EditSession