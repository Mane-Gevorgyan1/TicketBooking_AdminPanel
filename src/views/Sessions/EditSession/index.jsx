import './style.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllHalls } from 'src/services/action/hall_action'
import { StopLoading, StartLoading } from 'src/services/action/loading_action'
import { GetAllSessionEvents, GetSingleSession } from 'src/services/action/session_action'
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CCol, CForm, CFormInput, CSpinner } from '@coreui/react'

const EditSession = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sessionId] = useState(window.location.href.split('/edit-session/')[1])
    const session = useSelector(st => st.Session_reducer.session)
    const events = useSelector(st => st.Session_reducer.events)
    const halls = useSelector(st => st.Hall_reducer.halls)
    const loading = useSelector(st => st.Loading_reducer.loading)
    const [validated, setValidated] = useState(false)
    const [openHalls, setOpenHalls] = useState(false)
    const [openEvents, setOpenEvents] = useState(false)
    const [price, setPrice] = useState([])

    const [hallId, setHallId] = useState({})
    const [initialPrice, setInitialPrice] = useState([])
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
                time: session?.time,
                price: session?.price
            })
            setPrice(session?.price)
            setHallId(session?.hallId?._id)
            setInitialPrice(session?.price)
        }
    }, [session])

    function handleRowPriceChange(value, section, row) {
        let item = [...price]
        item[section].price[row].price = value
        setPrice(item)
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity() !== false) {
            dispatch(StartLoading())
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
            } else if (!details?.time) {
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
                fetch(`${process.env.REACT_APP_HOSTNAME}/editSession`, {
                    method: 'POST',
                    body: JSON.stringify({
                        id: sessionId,
                        hallId: details?.hall?._id,
                        eventId: details?.event?._id,
                        priceStart: details?.priceStart,
                        priceEnd: details?.priceEnd,
                        date: details?.date,
                        time: details?.time,
                        price
                    }),
                    redirect: 'follow',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            dispatch(StopLoading())
                            alert('Սեանսը փոփխված է')
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
                                            if (e._id === hallId) {
                                                setPrice(initialPrice)
                                            } else {
                                                setPrice(e?.price)
                                            }
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

                    <CAccordion flush className='sessionAccordion'>
                        {price?.length > 0 && price?.map((e, i) => (
                            <CAccordionItem itemKey={i + 1} key={i}>
                                <CAccordionHeader>Մաս {i + 1}</CAccordionHeader>
                                {e?.price?.length > 0 && e?.price?.map((e, j) => (
                                    <CAccordionBody key={j}>
                                        <label>Շարք {e.row} &nbsp;</label>
                                        <input value={e?.price} onChange={(event) => handleRowPriceChange(event.target.value, i, j)} />
                                        <label>&nbsp; դրամ</label>
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
                            value={details?.time}
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
                            Փոփոխել
                        </CButton>
                    </CCol>
                </CForm>
            </div>
        }
    </>)
}

export default EditSession