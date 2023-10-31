import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CButton, CCol, CForm, CFormInput } from '@coreui/react'
import { GetFeedback } from 'src/services/action/feedback_action'

const Feedback = () => {
    const dispatch = useDispatch()
    const feedbackId = '6540eccee9189a1965adff0a'
    const [validated, setValidated] = useState(false)
    const feedback = useSelector(st => st.Feedback_reducer.feedback)
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
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            fetch(`${process.env.REACT_APP_HOSTNAME}/editFeedback/${feedbackId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    facebook: details?.facebook,
                    instagram: details?.instagram,
                    twitter: details?.twitter,
                    phone: details?.phone,
                }),
                headers: { "Content-Type": "application/json" }
            })
                .then(response => response.json())
                .then(res => res.success && alert('Տվյալները փոփոխվեցին'))
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
                    defaultValue={details?.facebook}
                    onChange={(e) => setDetails({ ...details, facebook: e.target.value })}
                    label='Facebook'
                    feedbackInvalid='Պարտադիր դաշտ'
                    required
                />
            </CCol>
            <CCol md={8}>
                <CFormInput
                    defaultValue={details?.instagram}
                    onChange={(e) => setDetails({ ...details, instagram: e.target.value })}
                    label='Instagram'
                    feedbackInvalid='Պարտադիր դաշտ'
                    required
                />
            </CCol>
            <CCol md={8}>
                <CFormInput
                    defaultValue={details?.twitter}
                    onChange={(e) => setDetails({ ...details, twitter: e.target.value })}
                    label='Twitter'
                    feedbackInvalid='Պարտադիր դաշտ'
                    required
                />
            </CCol>
            <CCol md={8}>
                <CFormInput
                    defaultValue={details?.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    label='Phone'
                    feedbackInvalid='Պարտադիր դաշտ'
                    required
                />
            </CCol>
            <CCol xs={12}>
                <CButton color="primary" type="submit">Փոփոխել</CButton>
            </CCol>
        </CForm>
    )
}

export default Feedback