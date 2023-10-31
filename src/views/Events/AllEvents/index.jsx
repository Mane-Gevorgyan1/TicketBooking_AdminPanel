import './style.css'
import CIcon from '@coreui/icons-react'
import { cilDelete } from '@coreui/icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EachEventPopup } from 'src/components/popup/eachEvent'
import { DeleteEvent, GetAllEvents } from 'src/services/action/event_action'
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'

const AllEvents = () => {
    const dispatch = useDispatch()
    const events = useSelector(st => st.Event_reducer.events)
    const update = useSelector(st => st.Event_reducer.update)
    const [currentPage, setCurrentPage] = useState(1)
    const [openEvent, setOpenEvent] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState()

    useEffect(() => {
        dispatch(GetAllEvents(currentPage))
    }, [dispatch, currentPage, update])

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
                    <CCard className='eachEventCard' key={i}>
                        <CCardImage orientation='top' src={`${process.env.REACT_APP_IMAGE}/${e?.image}`} onClick={() => {
                            setSelectedEvent(e)
                            setOpenEvent(true)
                        }} />
                        <CCardBody>
                            <CCardTitle>{e?.title}</CCardTitle>
                            <div className='eventDetails'>
                                <CCardText>{e?.category?.name}</CCardText>
                                <CButton onClick={() => dispatch(DeleteEvent(e?._id))} color='danger'><CIcon icon={cilDelete} /></CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                ))
                : <h4 className='noEvents'>Միջոցառումներ չեն գտնվել</h4>
            }
        </div>
    )
}

export default AllEvents