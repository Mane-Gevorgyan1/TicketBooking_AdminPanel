import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MultiSelect } from 'react-multi-select-component'
import { GetAllGenres } from 'src/services/action/genre_action'
import { GetAllSponsors } from 'src/services/action/sponsor_action'
import { GetAllCategories, GetSingleEvent } from 'src/services/action/event_action'
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea } from '@coreui/react'

const EditEvent = () => {
    const dispatch = useDispatch()
    const event = useSelector(st => st.Event_reducer.event)
    const allCategories = useSelector(st => st.Event_reducer.categories)
    const allGenres = useSelector(st => st.Genre_reducer.allGenres)
    const allSponsors = useSelector(st => st.Sponsor_reducer.allSponsors)
    const [selectAllGenres, setSelectAllGenres] = useState([])
    const [selectAllCategories, setSelectAllCategories] = useState([])
    const [selectAllSponsors, setSelectAllSponsors] = useState([])
    const [eventId] = useState(window.location.hash.split('/')[2])
    const [validated, setValidated] = useState(false)
    const [file, setFile] = useState()
    const [blob, setBlob] = useState()
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedSponsors, setSelectedSponsors] = useState([])
    const [eventDetails, setEventDetails] = useState({
        title: '',
        topEvent: '',
        generalEvent: '',
        subcategory: '',
        description: ''
    })

    console.log(event);
    console.log(selectedGenres);

    useEffect(() => {
        dispatch(GetSingleEvent(eventId))
        dispatch(GetAllCategories())
        dispatch(GetAllGenres())
        dispatch(GetAllSponsors())
    }, [eventId, dispatch])

    useEffect(() => {
        let genres = []
        if (allGenres?.length) {
            allGenres?.forEach(element => {
                genres.push({ label: element?.name, value: element?._id })
            })
            setSelectAllGenres(genres)
        }
    }, [allGenres])

    useEffect(() => {
        let categories = []
        if (allCategories?.length) {
            allCategories?.forEach(element => {
                categories.push({ label: element?.name, value: element?._id })
            })
        }
        setSelectAllCategories(categories)
    }, [allCategories])

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
                subcategory: '',
                description: event?.description
            })

            let categories = []
            event?.category?.forEach(element => {
                categories.push({ label: element?.name, value: element?._id })
            })
            setSelectedCategories(categories)

            let genres = []
            event?.genres?.forEach(element => {
                genres.push({ label: element?.name, value: element._id })
            })
            setSelectedGenres(genres)

            let sponsors = []
            event?.sponsors?.forEach(element => {
                sponsors.push({ label: element?.name, value: element._id })
            })
            setSelectedSponsors(sponsors)
        }
    }, [event])

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
            if (selectedCategories.length) {
                let categories = []
                selectedCategories.forEach(element => {
                    categories.push(element.value)
                })
                formdata.append("category", categories)
            }
            if (selectedGenres.length) {
                let genres = []
                selectedCategories.forEach(element => {
                    genres.push(element.value)
                })
                formdata.append("genres", genres)
            }
            if (selectedSponsors.length) {
                let sponsors = []
                selectedCategories.forEach(element => {
                    sponsors.push(element.value)
                })
                formdata.append("sponsors", sponsors)
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
                    }
                })
                .catch(error => console.log('error', error));
        }
        setValidated(true)
    }

    function uploadSingleFile(e) {
        if (e.target.files.length) {
            setBlob(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
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
                    <img alt='' src={blob} className='eventImage' />
                    <CFormInput
                        type="file"
                        defaultValue={blob}
                        feedbackInvalid='Պարտադիր դաշտ'
                        required={!file?.length}
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
                    <CFormLabel>Բաժիններ</CFormLabel>
                    <MultiSelect
                        options={selectAllCategories}
                        value={selectedCategories}
                        onChange={setSelectedCategories}
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
                    <CFormLabel>Ժանրեր</CFormLabel>
                    <MultiSelect
                        options={selectAllGenres}
                        value={selectedGenres}
                        onChange={setSelectedGenres}
                        labelledBy="Select"
                        overrideStrings={{
                            allItemsAreSelected: 'Բոլորն ընտրված են',
                            clearSearch: 'Մաքրել որոնումը',
                            clearSelected: 'Մաքրել ընտրվածները',
                            noOptions: 'Ժանրեր չկան',
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