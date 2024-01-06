import './style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { StopLoading, StartLoading } from 'src/services/action/loading_action'
import { CButton, CCol, CForm, CFormInput, CFormTextarea } from '@coreui/react'

const CreateAd = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector(st => st.Loading_reducer.loading)
    const [validated, setValidated] = useState(false)
    const [file, setFile] = useState()
    const [blob, setBlob] = useState()
    const [text, setText] = useState({
        text_hy: '',
        text_en: '',
        text_ru: '',
    })
    const [url, setUrl] = useState('')

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
            dispatch(StartLoading())
            const formdata = new FormData()
            const myHeaders = new Headers()
            formdata.append("image", file)
            formdata.append("text", text.text_hy)
            formdata.append("text_en", text.text_en)
            formdata.append("text_ru", text.text_ru)
            formdata.append("url", url)
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
            fetch(`${process.env.REACT_APP_HOSTNAME}/createMainAd`, {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
                header: myHeaders,
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        dispatch(StopLoading())
                        alert('Գովազդը ստեղծված է')
                        navigate('/all-ads')
                    }
                })
                .catch(error => console.log('error', error));
        }
        setValidated(true)
    }

    return (<>
        {loading
            ? <Loading />
            : <CForm
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
                    />
                </CCol>
                <CCol md={4}>
                    <CFormTextarea
                        defaultValue={text?.text_en}
                        onChange={(e) => setText({ ...text, text_en: e.target.value })}
                        label='Text'
                    />
                </CCol>
                <CCol md={4}>
                    <CFormTextarea
                        defaultValue={text?.text_ru}
                        onChange={(e) => setText({ ...text, text_ru: e.target.value })}
                        label='Текст'
                    />
                </CCol>
                <CCol md={4}>
                    <CFormInput
                        defaultValue={url}
                        onChange={(e) => setUrl(e.target.value)}
                        label='URL'
                    />
                </CCol>
                <CCol xs={12}>
                    <CButton type="submit">Ստեղծել</CButton>
                </CCol>
            </CForm>
        }
    </>)
}

export default CreateAd