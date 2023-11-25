import './style.css'
import { useEffect, useState } from 'react'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GetSingleAd } from 'src/services/action/ad_action'
import { StopLoading, StartLoading } from 'src/services/action/loading_action'
import { CButton, CCol, CForm, CFormInput, CFormTextarea } from '@coreui/react'

const EditAd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(st => st.Loading_reducer.loading)
    const params = useParams()
    const ad = useSelector(st => st.Ad_reducer.ad)
    const [validated, setValidated] = useState(false)
    const [file, setFile] = useState()
    const [blob, setBlob] = useState()
    const [text, setText] = useState({
        text_hy: '',
        text_en: '',
        text_ru: '',
    })

    useEffect(() => {
        dispatch(GetSingleAd(params.id))
    }, [dispatch, params])

    useEffect(() => {
        if (Object.keys(ad).length > 0) {
            setText({
                text_hy: ad?.text,
                text_en: ad?.text_en,
                text_ru: ad?.text_ru,
            })
            setBlob(`${process.env.REACT_APP_IMAGE}/${ad?.image}`)
        }
    }, [ad])

    function handleImageChange(e) {
        if (e.target.files.length) {
            setBlob(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
        }
    }

    console.log(text.text_hy);

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
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
            fetch(`${process.env.REACT_APP_HOSTNAME}/editAd/${params.id}`, {
                method: 'PATCH',
                body: formdata,
                redirect: 'follow',
                headers: myHeaders,
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    // if (result.success) {
                    //     dispatch(StopLoading())
                    //     alert('Գովազդը փոփոխված է')
                    //     navigate('/all-ads')
                    // }
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
                        onChange={handleImageChange}
                        feedbackInvalid='Պարտադիր դաշտ'
                    />
                </CCol>
                <CCol md={4} /><CCol md={4} />
                <CCol md={4}>
                    <CFormTextarea
                        value={text?.text_hy}
                        onChange={(e) => setText({ ...text, text_hy: e.target.value })}
                        label='Տեքստ'
                    />
                </CCol>
                <CCol md={4}>
                    <CFormTextarea
                        value={text?.text_en}
                        onChange={(e) => setText({ ...text, text_en: e.target.value })}
                        label='Text'
                    />
                </CCol>
                <CCol md={4}>
                    <CFormTextarea
                        value={text?.text_ru}
                        onChange={(e) => setText({ ...text, text_ru: e.target.value })}
                        label='Текст'
                    />
                </CCol>
                <CCol xs={12}>
                    <CButton disabled={loading} type="submit">Փոփոխել</CButton>
                </CCol>
            </CForm>
        }
    </>)
}

export default EditAd