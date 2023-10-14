import './style.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteSession, GetAllSessions } from 'src/services/action/session_action'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

const AllSessions = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessions = useSelector(st => st.Session_reducer.sessions)
    const update = useSelector(st => st.Session_reducer.update)

    useEffect(() => {
        dispatch(GetAllSessions())
    }, [dispatch, update])

    return (
        <div className='allSessions'>
            {sessions?.length > 0
                ? sessions?.map((e, i) => (
                    <CCard className="mb-3 sessionCard" key={i}>
                        <CRow className="g-0">
                            <CCol>
                                <CCardImage className='sessionImage' src={`${process.env.REACT_APP_IMAGE}/${e?.eventId?.image}`} />
                                <CCardImage className='sessionImage' src={`${process.env.REACT_APP_IMAGE}/${e?.hallId?.image}`} />
                            </CCol>
                        </CRow>
                        <CCol>
                            <CCardBody>
                                <CCardTitle>{e?.eventId?.title}</CCardTitle>
                                <CCardTitle>{e?.hallId?.place}, {e.hallId?.hall}</CCardTitle>
                                <CCardText>{e?.date?.split('T')[0]}, {e?.time}</CCardText>
                                <CCardText>{e?.priceStart} - {e?.priceEnd} դրամ</CCardText>
                                <div className='sessionButtons'>
                                    <span onClick={() => navigate(`/edit-session/${e?._id}`)}>Փոփոխել</span>
                                    <span onClick={() => dispatch(DeleteSession(e?._id))}>Հեռացնել</span>
                                </div>
                            </CCardBody>
                        </CCol>
                    </CCard>
                ))
                : <span>Սեանսներ չկան</span>
            }
        </div>
    )
}

export default AllSessions