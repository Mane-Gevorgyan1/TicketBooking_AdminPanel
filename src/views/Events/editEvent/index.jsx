import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetSingleEvent } from 'src/services/action/event_action'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react'

const EditEvent = () => {
    const dispatch = useDispatch()
    const event = useSelector(st => st.Event_reducer.event)
    const [eventId] = useState(window.location.pathname.split('/')[2])
    console.log('event', event);

    const [validated, setValidated] = useState(false)
    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
    }

    useEffect(() => {
        dispatch(GetSingleEvent(eventId))
    }, [eventId, dispatch])
    return (
        <div>
            <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <CCol md={4}>
                    Նկար
                </CCol>
                <CCol md={4}>
                    <CFormInput
                        type="text"
                        defaultValue={event?.title}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Վերնագիր"
                        required
                    />
                </CCol>
                <CCol md={4}>
                    <CFormInput
                        type="date"
                        defaultValue={event?.date?.split('T')[0]}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Ամսաթիվ"
                        required
                    />
                </CCol>
                <CCol md={4}>
                    <CFormInput
                        type="text"
                        defaultValue={event?.location}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Քաղաք"
                        required
                    />
                </CCol>
                <CCol md={4}>
                    <CFormInput
                        type="text"
                        defaultValue={event?.place}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Վայր"
                        required
                    />
                </CCol>
                <CCol md={4}>
                    <CFormSelect
                        type="text"
                        defaultValue={event?.hall}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Դահլիճ"
                        required
                    >
                        <option>{event?.hall}</option>
                    </CFormSelect>
                </CCol>
                <CCol md={4}>
                    <CFormInput
                        type="number"
                        defaultValue={event?.priceStart}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Տոմսերի արժեքի սկիզբ"
                        required
                    />
                </CCol>
                <CCol md={4}>
                    <CFormInput
                        type="number"
                        defaultValue={event?.priceEnd}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Տոմսերի արժեքի վերջ"
                        required
                    />
                </CCol>
                <CCol md={4}>
                    <CFormInput
                        type="select"
                        defaultValue={event?.priceEnd}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Տոմսերի արժեքի վերջ"
                        required
                    />
                </CCol>
                <CCol md={4}>
                    {event?.category?.length > 0 &&
                        event?.category?.map((e, i) => (
                            <CFormCheck id="flexCheckDefault" label={e} key={i} />
                        ))
                    }
                </CCol>
                <CCol md={4}>
                    {event?.genre?.length > 0 &&
                        event?.genre?.map((e, i) => (
                            <CFormCheck id="flexCheckDefault" label={e} key={i} />
                        ))
                    }
                </CCol>
                <CCol md={4}>
                    {event?.sponsors?.length > 0 &&
                        event?.sponsors?.map((e, i) => (
                            <CFormCheck id="flexCheckDefault" label={e} key={i} />
                        ))
                    }
                </CCol>
                <CCol md={4}>
                    <CFormSelect
                        type="text"
                        defaultValue={event?.hall}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Առավելություն"
                        required
                    >
                        <option value={'generalEvent'}>Գլխավոր</option>
                        <option value={'topEvent'}>Թոփ</option>
                        <option value={''}>Բոլորը</option>
                    </CFormSelect>
                </CCol>
                <CCol md={12}>
                    <CFormTextarea
                        feedbackInvalid='Պարտադիր դաշտ'
                        id="validationTextarea"
                        label="Նկարագրություն"
                        placeholder="..."
                        required
                        defaultValue={event?.description}
                        rows={5}
                    />
                </CCol>
                <CCol xs={12}>
                    <CButton color="primary" type="submit">
                        Submit form
                    </CButton>
                </CCol>
            </CForm>
        </div>
    )
}

export default EditEvent