import './style.css'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleTicket } from 'src/services/action/ticket_action'
import { CButton, CCol, CFormInput, CFormTextarea, CRow } from '@coreui/react'

const SingleTicket = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const ticket = useSelector(st => st.Ticket_reducer.singleTicket)

    useEffect(() => {
        dispatch(getSingleTicket(params.id))
    }, [dispatch, params])

    return (
        <div>
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
            <CRow>
                <CCol md={4}>
                    <CFormInput
                        readOnly
                        label='Սեանս'
                        value=''
                    />
                </CCol>
            </CRow><br />

            <CRow>
                <CCol md={3}>
                    <CFormInput
                        readOnly
                        label='Գինը'
                        value={ticket?.price || ''}
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

            <CButton color='danger'>Հետ վերադարձ</CButton>

        </div >
    )
}

export default SingleTicket