import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MultiSelect } from 'react-multi-select-component'
import { GetAllCategories, GetSingleEvent } from 'src/services/action/event_action'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react'

const EditEvent = () => {
    const dispatch = useDispatch()
    const event = useSelector(st => st.Event_reducer.event)
    const allCategories = useSelector(st => st.Event_reducer.categories)
    const [eventId] = useState(window.location.hash.split('/')[2])
    const [validated, setValidated] = useState(false)
    const [file, setFile] = useState()
    const [selectedCategories, setSelectedCategories] = useState([])

    console.log('selectedCategories', selectedCategories)

    useEffect(() => {
        dispatch(GetSingleEvent(eventId))
        dispatch(GetAllCategories())
    }, [eventId, dispatch])

    useEffect(() => {
        if (event) {
            setFile(`${process.env.REACT_APP_IMAGE}/${event?.image}`)
            let categories = []
            event?.category?.forEach(element => {
                categories.push({ label: element , value: element})
            })
            setSelectedCategories(categories)
        }
    }, [event])

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
    }

    function uploadSingleFile(e) {
        if (e.target.files.length) {
            setFile(URL.createObjectURL(e.target.files[0]))
            // const token = localStorage.getItem('token')
            // const myHeaders = new Headers();
            // myHeaders.append("Authorization", `Bearer ${token}`);
            // const formdata = new FormData();
            // formdata.append("logo", e.target.files[0]);

            // fetch(`${process.env.REACT_APP_HOSTNAME}/updateLogoProizvoditel`, {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: formdata,
            //     redirect: 'follow'
            // })
            //     .then(response => response.json())
            //     .then(result => result.status && setFile(URL.createObjectURL(e.target.files[0])))
            //     .catch(error => console.log('error', error));
        }
    }

    return (
        <div>
            <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <CCol md={4}>
                    <img alt='' src={file} className='eventImage' />
                    <CFormInput
                        type="file"
                        defaultValue={file}
                        feedbackInvalid='Պարտադիր դաշտ'
                        required={!file?.length}
                    />
                </CCol>
                <CCol md={4}></CCol>
                <CCol md={4}></CCol>
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
                <CCol md={4}>
                    <MultiSelect
                        options={allCategories}
                        value={selectedCategories}
                        onChange={setSelectedCategories}
                        labelledBy="Select"
                        overrideStrings={{
                            allItemsAreSelected: 'Բոլոր բաժիններ ընտրված են',
                            clearSearch: 'Մաքրել որոնումը',
                            clearSelected: 'Մաքրել ընտրվածները',
                            noOptions: 'Բաժիններ չկան',
                            search: 'Որոնել',
                            selectAll: 'Ընտրել բոլորը',
                            selectAllFiltered: 'Ընտրել բոլոր (ֆիլտրված)',
                            selectSomeItems: 'Ընտրել...',
                        }}
                    />
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