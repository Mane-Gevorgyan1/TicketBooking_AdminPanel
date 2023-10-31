import './style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CCol, CForm, CFormInput, CFormTextarea } from '@coreui/react'

const CreateAd = () => {
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false)
    const [file, setFile] = useState()
    const [blob, setBlob] = useState()
    const [text, setText] = useState({
        text_hy: '',
        text_en: '',
        text_ru: '',
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
            formdata.append("text", text.text_hy)
            formdata.append("text_en", text.text_en)
            formdata.append("text_ru", text.text_ru)

            fetch(`${process.env.REACT_APP_HOSTNAME}/createMainAd`, {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
                header: {
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert('Գովազդը ստեղծված է')
                        navigate('/all-ads')
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
                <CFormTextarea
                    defaultValue={text?.text_hy}
                    onChange={(e) => setText({ ...text, text_hy: e.target.value })}
                    label='Տեքստ'
                    feedbackInvalid='Պարտադիր դաշտ'
                    required
                />
            </CCol>
            <CCol md={4}>
                <CFormTextarea
                    defaultValue={text?.text_en}
                    onChange={(e) => setText({ ...text, text_en: e.target.value })}
                    label='Text'
                    feedbackInvalid='Required field'
                    required
                />
            </CCol>
            <CCol md={4}>
                <CFormTextarea
                    defaultValue={text?.text_ru}
                    onChange={(e) => setText({ ...text, text_ru: e.target.value })}
                    label='Текст'
                    feedbackInvalid='Обязательное поле'
                    required
                />
            </CCol>
            <CCol xs={12}>
                <CButton color="primary" type="submit">Ստեղծել</CButton>
            </CCol>
        </CForm>
    )
}

export default CreateAd