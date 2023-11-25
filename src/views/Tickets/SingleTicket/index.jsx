import './style.css'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { ResetTickets, ReturnTicket, getSingleTicket } from 'src/services/action/ticket_action'
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CFormInput, CFormTextarea, CRow } from '@coreui/react'

const SingleTicket = () => {
    const dispatch = useDispatch()
    const { ticketId } = useParams()
    const ticket = useSelector(st => st.Ticket_reducer.singleTicket)
    const loading = useSelector(st => st.Loading_reducer.loading)

    useEffect(() => {
        dispatch(ResetTickets())
        dispatch(getSingleTicket(ticketId))
    }, [dispatch, ticketId])

    function handleReturnTicket() {
        dispatch(ReturnTicket(ticket?.sessionId?._id, ticket?.seatId, ticket?.ticketNumber, ticket?.orderId))
    }

    return (<>
        {loading
            ? <Loading />
            : <div>
                <div className='ticketHeader'>
                    <h1>Տոմսի համար {ticket?.ticketNumber}</h1>
                    <span>orderId: {ticket?.orderId}</span>
                </div><br /><br />

                <h4>Գնորդի տվյալներ</h4><br />

                <CRow>
                    <CCol md={4}>
                        <CFormInput
                            readOnly
                            label='Անուն'
                            value={ticket?.buyerName || ''}
                        />
                    </CCol><br />

                    <CCol md={4}>
                        <CFormInput
                            readOnly
                            label='Էլ. հասցե'
                            value={ticket?.buyerEmail || ''}
                        />
                    </CCol>

                    <CCol md={4}>
                        <CFormInput
                            readOnly
                            label='Հեռախոս'
                            value={ticket?.buyerPhone || ''}
                        />
                    </CCol>
                </CRow> <br />

                <CRow>
                    <CCol md={4}>
                        <CFormInput
                            readOnly
                            label='Առաքում'
                            value={ticket?.delivery ? 'Այո' : 'Ոչ'}
                        />
                    </CCol>

                    <CCol md={4}>
                        <CFormInput
                            readOnly
                            label='Առաքման վայր'
                            value={ticket?.deliveryLocation || ''}
                        />
                    </CCol>

                    <CCol md={4}>
                        <CFormInput
                            readOnly
                            label='Ամսաթիվ'
                            value={`${ticket?.createdAt?.split('.')[0]?.split('T')[0]}, ${ticket?.createdAt?.split('.')[0]?.split('T')[1]}` || ''}
                        />
                    </CCol>
                </CRow><br />

                <CRow>
                    <CCol md={8}>
                        <CFormTextarea
                            readOnly
                            label='Նշումներ'
                            value={ticket?.buyerNotes || ''}
                        />
                    </CCol>
                </CRow><br /><br />

                <h4>Տոմսի տվյալներ</h4><br />
                {ticket?.sessionId && <CRow>
                    <CCard className="mb-3 sessionCard">
                        <CRow className="g-0">
                            <CCol>
                                <CCardImage className='sessionImage' src={`${process.env.REACT_APP_IMAGE}/${ticket?.sessionId?.eventId?.image}`} />
                                <CCardImage className='sessionImage' src={`${process.env.REACT_APP_IMAGE}/${ticket?.sessionId?.hallId?.image}`} />
                            </CCol>
                        </CRow>
                        <CCol>
                            <CCardBody>
                                <CCardTitle>{ticket?.sessionId?.eventId?.title}</CCardTitle>
                                <CCardTitle>{ticket?.sessionId?.hallId?.place}, {ticket?.sessionId?.hallId?.hall}</CCardTitle>
                                <CCardText>{ticket?.sessionId?.date?.split('T')[0]} {ticket?.sessionId?.time}</CCardText>
                                <CCardText>{ticket?.sessionId?.priceStart} - {ticket?.sessionId?.priceEnd} դրամ</CCardText>
                            </CCardBody>
                        </CCol>
                    </CCard>
                </CRow>}<br />
                <CRow>
                    <CCol md={3}>
                        <CFormInput
                            readOnly
                            label='Գինը'
                            value={ticket?.price || ''}
                        />
                    </CCol>
                    <CCol md={6}>
                        <CFormInput
                            readOnly
                            label='order id'
                            value={ticket?.orderId}
                        />
                    </CCol>
                </CRow><br />

                <CRow>
                    <CCol md={3}>
                        <CFormInput
                            readOnly
                            label='Վայր'
                            value={ticket?.amphitheater ? 'Ամֆիթատրոն' : ticket?.lodge ? 'Օթյակ' : ticket?.parterre ? 'Պարտեր' : ''}
                        />
                    </CCol>

                    <CCol md={3}>
                        <CFormInput
                            readOnly
                            label='Շարք'
                            value={ticket?.row || ''}
                        />
                    </CCol>

                    <CCol md={3}>
                        <CFormInput
                            readOnly
                            label='Տեղ'
                            value={ticket?.seat || ''}
                        />
                    </CCol>
                </CRow><br />

                <CRow>
                    <CCol md={3}>
                        <CFormInput
                            readOnly
                            label='Վճարման մեթոդ'
                            value={ticket?.paymentMethod || ''}
                        />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput
                            readOnly
                            label='Վճ. կարգավիճակ'
                            value={ticket?.paymentVerified ? 'Հաստատված' : 'Չհաստատված'}
                        />
                    </CCol>
                </CRow><br />

                <CButton color='danger' onClick={handleReturnTicket}>Հետ վերադարձ</CButton>
            </div >
        }
    </>)
}

export default SingleTicket