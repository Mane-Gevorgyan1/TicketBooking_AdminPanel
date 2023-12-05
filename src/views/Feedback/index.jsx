import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetFeedback } from 'src/services/action/feedback_action'
import { CButton, CCol, CForm, CFormInput, CSpinner } from '@coreui/react'
import { StopLoading, StartLoading } from 'src/services/action/loading_action'

const Feedback = () => {
    const dispatch = useDispatch()
    const feedbackId = '656f86b0cd7ce45b005bf035'
    const feedback = useSelector(st => st.Feedback_reducer.feedback)
    const loading = useSelector(st => st.Loading_reducer.loading)
    const [validated, setValidated] = useState(false)
    const [details, setDetails] = useState({
        facebook: '',
        instagram: '',
        twitter: '',
        phone: '',
    })

    useEffect(() => {
        dispatch(GetFeedback(feedbackId))
    }, [dispatch])

    useEffect(() => {
        if (Object.keys(feedback).length > 0) {
            setDetails({
                facebook: feedback?.facebook,
                instagram: feedback?.instagram,
                twitter: feedback?.twitter,
                phone: feedback?.phone,
            })
        }
    }, [feedback])

    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity() !== false) {
            dispatch(StartLoading())
            const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
            fetch(`${process.env.REACT_APP_HOSTNAME}/editFeedback/${feedbackId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    facebook: details?.facebook,
                    instagram: details?.instagram,
                    twitter: details?.twitter,
                    phone: details?.phone,
                }),
                headers: myHeaders,
            })
                .then(response => response.json())
                .then(res => {
                    if (res.success) {
                        dispatch(StopLoading())
                        alert('Տվյալները փոփոխվեցին')
                    }
                })
                .catch(() => alert('Server error'))
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
            <CCol md={8}>
                <CFormInput
                    defaultValue={details?.facebook || ''}
                    onChange={(e) => setDetails({ ...details, facebook: e.target.value })}
                    label='Facebook'
                    feedbackInvalid='Պարտադիր դաշտ'
                    required
                />
            </CCol>
            <CCol md={8}>
                <CFormInput
                    defaultValue={details?.instagram || ''}
                    onChange={(e) => setDetails({ ...details, instagram: e.target.value })}
                    label='Instagram'
                    feedbackInvalid='Պարտադիր դաշտ'
                    required
                />
            </CCol>
            <CCol md={8}>
                <CFormInput
                    defaultValue={details?.twitter || ''}
                    onChange={(e) => setDetails({ ...details, twitter: e.target.value })}
                    label='Twitter'
                    feedbackInvalid='Պարտադիր դաշտ'
                    required
                />
            </CCol>
            <CCol md={8}>
                <CFormInput
                    defaultValue={details?.phone || ''}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    label='Phone'
                    feedbackInvalid='Պարտադիր դաշտ'
                    required
                />
            </CCol>
            <CCol xs={12}>
                <CButton disabled={loading} type="submit">
                    {loading && <CSpinner component="span" size="sm" aria-hidden="true" />}
                    Փոփոխել
                </CButton>
            </CCol>
        </CForm>
    )
}

export default Feedback