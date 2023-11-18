import './style.css'
import CIcon from '@coreui/icons-react'
import { useEffect, useState } from 'react'
import { Loading } from 'src/components/loading'
import { cilDelete, cilPencil } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { EachEventPopup } from 'src/components/popup/eachEvent'
import { DeleteEvent, GetAllEvents } from 'src/services/action/event_action'
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle, CPagination } from '@coreui/react'

const AllEvents = () => {
    const dispatch = useDispatch()
    const events = useSelector(st => st.Event_reducer.events)
    const update = useSelector(st => st.Event_reducer.update)
    const loading = useSelector(st => st.Loading_reducer.loading)
    const pageInfo = useSelector(st => st.Event_reducer.pageInfo)
    const [currentPage, setCurrentPage] = useState(1)
    const [openEvent, setOpenEvent] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState()

    useEffect(() => {
        dispatch(GetAllEvents(currentPage))
    }, [dispatch, currentPage, update])

    return (<>
        {loading
            ? <Loading />
            : <div className='allEvents'>
                {openEvent &&
                    <EachEventPopup
                        open={openEvent}
                        setOpen={setOpenEvent}
                        event={selectedEvent}
                    />
                }

                <div className='eventPagination'>
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
                                        <div className='event-btns'>
                                            <CButton onClick={() => window.location = `/edit-event/${e?._id}`}><CIcon icon={cilPencil} /></CButton>
                                            <CButton onClick={() => dispatch(DeleteEvent(e?._id))} color='danger'><CIcon icon={cilDelete} /></CButton>
                                        </div>
                                    </div>
                                </CCardBody>
                            </CCard>
                        ))
                        : <h4 className='noEvents'>Միջոցառումներ չեն գտնվել</h4>
                    }
                </div>

                {pageInfo.totalPages > 1 &&
                    <div className='paginationWidth'>
                        <CPagination align="center">
                            <button onClick={() => pageInfo.currentPage !== 1 && setCurrentPage(pageInfo.currentPage - 1)} className='paginationBigButtons pgLeft'>Նախորդ</button>
                            {Array.from({ length: pageInfo.totalPages }, (_, index) => index + 1).map((e, i) => (
                                <button key={i} onClick={() => setCurrentPage(e)} className={pageInfo.currentPage === e ? 'activePagination myPagination' : 'myPagination'}>
                                    {e}
                                </button>
                            ))}
                            <button onClick={() => pageInfo.currentPage !== pageInfo.totalPages && setCurrentPage(pageInfo.currentPage + 1)} className='paginationBigButtons pgRight'>Հաջորդ</button>
                        </CPagination>
                    </div>
                }
            </div>
        }
    </>)
}

export default AllEvents