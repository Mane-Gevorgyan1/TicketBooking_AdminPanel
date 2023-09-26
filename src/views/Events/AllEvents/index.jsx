import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EachEventPopup } from 'src/components/popup/eachEvent'
import { GetAllEvents } from 'src/services/action/event_action'
import { CCard, CCardBody, CCardImage, CCardTitle } from '@coreui/react'

const AllEvents = () => {
    const dispatch = useDispatch()
    const events = useSelector(st => st.Event_reducer.events)
    const [currentPage, setCurrentPage] = useState(1)
    const [openEvent, setOpenEvent] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState()
    
    useEffect(() => {
        dispatch(GetAllEvents(currentPage))
    }, [dispatch, currentPage])

    return (
        <div className='allEvents'>
            {openEvent &&
                <EachEventPopup
                    open={openEvent}
                    setOpen={setOpenEvent}
                    event={selectedEvent}
                />
            }
            {events.length > 0
                ? events?.map((e, i) => (
                    <CCard className='eachEventCard' key={i} onClick={() => {
                        (setSelectedEvent(e))
                        setOpenEvent(true)
                    }}>
                        <CCardImage orientation='top' src={`${process.env.REACT_APP_IMAGE}/${e?.image}`} />
                        <CCardBody>
                            <CCardTitle>{e?.title}</CCardTitle>
                        </CCardBody>
                    </CCard>
                ))
                : <h4 className='noEvents'>Միջոցառումներ չեն գտնվել</h4>
            }
        </div>
    )
}

export default AllEvents