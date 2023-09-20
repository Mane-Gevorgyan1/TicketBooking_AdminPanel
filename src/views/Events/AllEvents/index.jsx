import './style.css'
import ReactImg from 'src/assets/images/react.jpg'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Calendar, Location, Ticket } from 'src/assets/svg'
import { EachEventPopup } from 'src/components/popup/eachEvent'
import { GetAllEvents } from "src/services/action/event_action"
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle } from "@coreui/react"

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
        <div className="allEvents">
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
                        <CCardImage orientation="top" src={ReactImg} />
                        <CCardBody>
                            <CCardTitle>{e?.title}</CCardTitle>
                            <CCardText><Calendar /> {e?.date.split('T')[0]}</CCardText>
                            <CCardText><Location /> {e?.location}</CCardText>
                            <CCardText><Ticket /> {e?.priceStart} - {e?.priceEnd}</CCardText>
                        </CCardBody>
                    </CCard>
                ))
                : <h4 className='noEvents'>Միջոցառումներ չեն գտնվել</h4>
            }
        </div>
    )
}

export default AllEvents