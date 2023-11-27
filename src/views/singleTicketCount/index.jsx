import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetSingleSession } from 'src/services/action/ticket_action'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

const SingleTicketCount = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const session = useSelector(st => st.Ticket_reducer.session)

    useEffect(() => {
        dispatch(GetSingleSession(params.id))
    }, [dispatch, params])

    return (
        <CCard className="mb-3 sessionCard">
            <CRow className="g-0">
                <CCol>
                    <CCardImage className='sessionImage' src={`${process.env.REACT_APP_IMAGE}/${session?.eventId?.image}`} />
                    <CCardImage className='sessionImage' src={`${process.env.REACT_APP_IMAGE}/${session?.hallId?.image}`} />
                </CCol>
            </CRow>
            <CCol>
                <CCardBody>
                    <CCardTitle>{session?.eventId?.title}</CCardTitle>
                    <CCardTitle>{session?.hallId?.place}, {session.hallId?.hall}</CCardTitle>
                    <CCardText>{session?.date?.split('T')[0]}, {session?.time}</CCardText>
                    <CCardText>{session?.priceStart} - {session?.priceEnd} դրամ</CCardText>
                </CCardBody>
            </CCol>
        </CCard>
    )
}

export default SingleTicketCount