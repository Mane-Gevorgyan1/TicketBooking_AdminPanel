import './style.css'
import { useState } from 'react'
import { CButton, CCol, CForm, CFormInput } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const CreateSponsor = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState()
    const [blob, setBlob] = useState()
    const [name, setName] = useState('')
    const [validated, setValidated] = useState(false)

    function handleImageChange(e) {
        if (e.target.files.length) {
            setBlob(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity() !== false) {
            const formdata = new FormData()
            formdata.append("image", file)
            formdata.append("name", name)

            fetch(`${process.env.REACT_APP_HOSTNAME}/createSponsor`, {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert('Հովանավորը ստեղծված է')
                        navigate('/all-sponsors')
                    }
                })
                .catch(error => console.log('error', error));
        }
        setValidated(true)
    }

    return (
        <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            <CCol md={4}>
                <img alt='' src={blob} className='sponsorImage' />
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
                <CFormInput
                    type="text"
                    defaultValue=''
                    onChange={(e) => setName(e.target.value)}
                    feedbackInvalid='Պարտադիր դաշտ'
                    label="Անուն"
                    required
                />
            </CCol>
            <CCol xs={12}>
                <CButton color="primary" type="submit">Ստեղծել</CButton>
            </CCol>
        </CForm>
    )
}

export default CreateSponsor