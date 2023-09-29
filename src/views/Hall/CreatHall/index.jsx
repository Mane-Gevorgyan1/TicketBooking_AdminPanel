import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea } from "@coreui/react"
import { useState } from "react"

const CreatHall = () => {
    const [blob, setBlob] = useState()
    const [file, setFile] = useState()
    const [validated, setValidated] = useState(false)

    const [eventDetails, setEventDetails] = useState({
        location: '',
        place: '',
        hall: ''
    })
    function handleImageChange(e) {
        if (e.target.files.length) {
            setBlob(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            const formdata = new FormData()
            formdata.append("image", file)
            formdata.append("location", eventDetails?.location)
            formdata.append("place", eventDetails?.place)
            formdata.append("hall", eventDetails?.hall)
        }
        setValidated(true)
    }

    return <div>
        <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}

        >
            <CCol md={4}>
                <img alt='' src={blob} className='eventImage' />
                <CFormInput
                    type="file"
                    defaultValue=''
                    onChange={handleImageChange}
                    feedbackInvalid='Պարտադիր դաշտ'
                    required
                />
            </CCol>
            <CCol md={4} /><CCol md={4} />
            <CCol md={4}>
                <CFormSelect
                    // options={selectAllCategories}
                    feedbackInvalid='Պարտադիր դաշտ'
                    label="Բաժիններ"
                    required
                    onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                />
            </CCol>
            <CCol md={4} /><CCol md={4} />
            <CCol md={4}>
                <CFormSelect
                    // options={selectAllCategories}
                    feedbackInvalid='Պարտադիր դաշտ'
                    label="Բաժիններ"
                    required
                    onChange={(e) => setEventDetails({ ...eventDetails, place: e.target.value })}
                />
            </CCol>
            <CCol md={4} /><CCol md={4} />
            <CCol md={4}>
                <CFormSelect
                    // options={selectAllCategories}
                    feedbackInvalid='Պարտադիր դաշտ'
                    label="Բաժիններ"
                    required
                    onChange={(e) => setEventDetails({ ...eventDetails, hall: e.target.value })}
                />
            </CCol>
            <CCol xs={12}>
                <CButton color="primary" type="submit">Ստեղծել</CButton>
            </CCol>
        </CForm>
    </div>
}
export default CreatHall
