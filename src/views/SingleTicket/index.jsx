import './style.css'
import { CCol, CFormInput, CFormTextarea, CRow } from '@coreui/react'

const SingleTicket = () => {
    return (
        <div>
            <div className='ticketHeader'>
                <h1>Տոմսի համար 123456</h1>
            </div><br /><br />

            <h4>Գնորդի տվյալներ</h4><br />

            <CRow>
                <CCol md={4}>
                    <CFormInput
                        readOnly
                        label='Անուն'
                        value='Mane Gevorgyan'
                    />
                </CCol><br />

                <CCol md={4}>
                    <CFormInput
                        readOnly
                        label='Էլ. հասցե'
                        value='manegevorgyan1@gmail.com'
                    />
                </CCol>

                <CCol md={4}>
                    <CFormInput
                        readOnly
                        label='Հեռախոս'
                        value='+374987654'
                    />
                </CCol>
            </CRow> <br />

            <CRow>
                <CCol md={2}>
                    <CFormInput
                        readOnly
                        label='Առաքում'
                        value='Այո'
                    />
                </CCol>

                <CCol md={2}>
                    <CFormInput
                        readOnly
                        label='Ամսաթիվ'
                        value='2023-11-09, 14:48'
                    />
                </CCol>

                <CCol md={8}>
                    <CFormTextarea
                        readOnly
                        label='Նշումներ'
                        value='Խնդրում եմ առաքումն իրականացնել ժամը 14:00 - 18:00 սահմաններում'
                    />
                </CCol>
            </CRow><br />

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
                <CCol md={2}>
                    <CFormInput
                        readOnly
                        label='Գինը'
                        value='20000'
                    />
                </CCol>

            </CRow><br />


            <CRow>
                <CCol md={2}>
                    <CFormInput
                        readOnly
                        label='Վայր'
                        value='Ամֆիթատրոն'
                    />
                </CCol>

                <CCol md={2}>
                    <CFormInput
                        readOnly
                        label='Շարք'
                        value='1'
                    />
                </CCol>

                <CCol md={2}>
                    <CFormInput
                        readOnly
                        label='Տեղ'
                        value='7'
                    />
                </CCol>
            </CRow><br />

            <CRow>
                <CCol md={2}>
                    <CFormInput
                        readOnly
                        label='Վճարման մեթոդ'
                        value='MasterCard'
                    />
                </CCol>
                <CCol md={2}>
                    <CFormInput
                        readOnly
                        label='Վճ. կարգավիճակ'
                        value='Հաստատված'
                    />
                </CCol>
            </CRow><br />

        </div >
    )
}

export default SingleTicket