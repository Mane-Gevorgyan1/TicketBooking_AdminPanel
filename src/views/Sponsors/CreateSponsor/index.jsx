import './style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { CButton, CCol, CForm, CFormInput } from '@coreui/react'
import { StopLoading, StartLoading } from 'src/services/action/loading_action'

const CreateSponsor = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector(st => st.Loading_reducer.loading)
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
            dispatch(StartLoading())
            const formdata = new FormData()
            formdata.append("image", file)
            formdata.append("name", name)
            const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
            fetch(`${process.env.REACT_APP_HOSTNAME}/createSponsor`, {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
                headers: myHeaders,
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        dispatch(StopLoading())
                        alert('Հովանավորը ստեղծված է')
                        navigate('/all-sponsors')
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
                    <CButton type="submit">Ստեղծել</CButton>
                </CCol>
            </CForm>
        }
    </>)
}

export default CreateSponsor