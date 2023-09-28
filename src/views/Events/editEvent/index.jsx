import './style.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MultiSelect } from 'react-multi-select-component'
import { GetSingleEvent } from 'src/services/action/event_action'
import { GetAllSponsors } from 'src/services/action/sponsor_action'
import { GetAllCategories } from 'src/services/action/category_action'
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea } from '@coreui/react'

const EditEvent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const event = useSelector(st => st.Event_reducer.event)
    const allCategories = useSelector(st => st.Category_reducer.allCategories)
    const allSponsors = useSelector(st => st.Sponsor_reducer.allSponsors)
    const [eventId] = useState(window.location.hash.split('/')[2])
    const [selectAllCategories, setSelectAllCategories] = useState([])
    const [selectAllSponsors, setSelectAllSponsors] = useState([])
    const [selectedSponsors, setSelectedSponsors] = useState([])
    const [allSubcategories, setAllSubcategories] = useState([])
    const [selectedSubcategories, setSelectedSubcategories] = useState([])
    const [validated, setValidated] = useState(false)
    const [file, setFile] = useState()
    const [blob, setBlob] = useState()
    const [eventDetails, setEventDetails] = useState({
        title: '',
        topEvent: '',
        generalEvent: '',
        subcategory: [],
        description: ''
    })

    useEffect(() => {
        dispatch(GetSingleEvent(eventId))
        dispatch(GetAllCategories())
        dispatch(GetAllSponsors())
    }, [eventId, dispatch])

    useEffect(() => {
        let categories = []
        if (allCategories?.length) {
            allCategories?.forEach(element => {
                categories.push({ label: element?.name, value: element?._id })
            })
            setSelectAllCategories(categories)
        }

        let subcategories = []
        allCategories?.forEach(category => {
            if (category?._id === eventDetails?.category) {
                category.subcategories?.forEach(element => {
                    subcategories.push({ label: element?.name, value: element?._id })
                })
            }
        })
        setAllSubcategories(subcategories)
    }, [allCategories, eventDetails])

    useEffect(() => {
        let sponsors = []
        if (allSponsors?.length) {
            allSponsors?.forEach(element => {
                sponsors.push({ label: element?.name, value: element?._id })
            })
        }
        setSelectAllSponsors(sponsors)
    }, [allSponsors])

    useEffect(() => {
        if (event) {
            setBlob(`${process.env.REACT_APP_IMAGE}/${event?.image}`)

            setEventDetails({
                title: event?.title,
                topEvent: event?.topEvent,
                generalEvent: event?.generalEvent,
                category: event?.category?._id,
                subcategory: '',
                description: event?.description
            })

            let sponsors = []
            event?.sponsors?.forEach(element => {
                sponsors.push({ label: element?.name, value: element._id })
            })
            setSelectedSponsors(sponsors)

            let subcategories = []
            event?.subcategories?.forEach(eventSubcategories => {
                event?.category?.subcategories?.forEach(subcategory => {
                    if (eventSubcategories._id === subcategory._id) {
                        subcategories.push({ label: subcategory.name, value: subcategory._id })
                    }
                })
            })
            setSelectedSubcategories(subcategories)
        }
    }, [event])

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
            formdata.append("id", eventId)
            formdata.append("title", eventDetails?.title)
            formdata.append("topEvent", eventDetails?.topEvent)
            formdata.append("generalEvent", eventDetails?.generalEvent)
            formdata.append("description", eventDetails?.description)
            formdata.append("category", eventDetails.category)

            if (selectedSubcategories?.length) {
                selectedSubcategories?.forEach(element => {
                    formdata.append("subcategories[]", element.value)
                })
            }

            if (selectedSponsors?.length) {
                selectedSponsors?.forEach(element => {
                    formdata.append("sponsors[]", element.value)
                })
            }

            fetch(`${process.env.REACT_APP_HOSTNAME}/editEvent`, {
                method: 'PATCH',
                body: formdata,
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.success) {
                        alert('Միջոցառումը թարմացված է')
                        navigate('/all-events')
                    }
                })
                .catch(error => console.log('error', error));
        }
        setValidated(true)
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
                    <img alt='' src={blob} className='eventImage' />
                    <CFormInput
                        type="file"
                        defaultValue={blob}
                        onChange={handleImageChange}
                        feedbackInvalid='Պարտադիր դաշտ'
                        required={!file?.length && !blob?.length}
                    />
                </CCol>
                <CCol md={4} /><CCol md={4} />
                <CCol md={4}>
                    <CFormInput
                        type="text"
                        defaultValue={event?.title}
                        onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Վերնագիր"
                        required
                    />
                </CCol>
                <CCol md={4}>
                    <CFormSelect
                        type="text"
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Առավելություն"
                        value={eventDetails?.generalEvent ? 'generalEvent' : eventDetails?.topEvent ? 'topEvent' : ''}
                        required
                        onChange={(e) => {
                            if (e.target.value === 'generalEvent') {
                                setEventDetails({ ...eventDetails, generalEvent: true, topEvent: false })
                            } else if (e.target.value === 'topEvent') {
                                setEventDetails({ ...eventDetails, generalEvent: false, topEvent: true })
                            } else {
                                setEventDetails({ ...eventDetails, generalEvent: false, topEvent: false })
                            }
                        }}
                    >
                        <option value={'generalEvent'}>Գլխավոր</option>
                        <option value={'topEvent'}>Թոփ</option>
                        <option value={''}>Բոլորը</option>
                    </CFormSelect>
                </CCol>
                <CCol md={4}>
                    <CFormSelect
                        options={selectAllCategories}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Բաժիններ"
                        value={eventDetails?.category}
                        onChange={(e) => setEventDetails({ ...eventDetails, category: e.target.value })}
                        required
                    />
                </CCol>
                <CCol md={4}>
                    <CFormLabel>Ենթաբաժիններ</CFormLabel>
                    <MultiSelect
                        options={allSubcategories}
                        value={selectedSubcategories}
                        onChange={setSelectedSubcategories}
                        labelledBy="Select"
                        overrideStrings={{
                            allItemsAreSelected: 'Բոլորն ընտրված են',
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
                    <CFormLabel>Հովանավորներ</CFormLabel>
                    <MultiSelect
                        options={selectAllSponsors}
                        value={selectedSponsors}
                        onChange={setSelectedSponsors}
                        labelledBy="Select"
                        overrideStrings={{
                            allItemsAreSelected: 'Բոլորն ընտրված են',
                            clearSearch: 'Մաքրել որոնումը',
                            clearSelected: 'Մաքրել ընտրվածները',
                            noOptions: 'Հովանավորներ չկան',
                            search: 'Որոնել',
                            selectAll: 'Ընտրել բոլորը',
                            selectAllFiltered: 'Ընտրել բոլոր (ֆիլտրված)',
                            selectSomeItems: 'Ընտրել...',
                        }}
                    />
                </CCol>
                <CCol md={12}>
                    <CFormTextarea
                        feedbackInvalid='Պարտադիր դաշտ'
                        id="validationTextarea"
                        label="Նկարագրություն"
                        placeholder="..."
                        required
                        defaultValue={event?.description}
                        onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                        rows={5}
                    />
                </CCol>
                <CCol xs={12}>
                    <CButton color="primary" type="submit">Փոփոխել</CButton>
                </CCol>
            </CForm>
        </div>
    )
}

export default EditEvent