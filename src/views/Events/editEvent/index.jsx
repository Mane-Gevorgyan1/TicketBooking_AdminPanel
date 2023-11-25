import './style.css'
import { useEffect, useState } from 'react'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MultiSelect } from 'react-multi-select-component'
import { GetAllSponsors } from 'src/services/action/sponsor_action'
import { GetAllCategories } from 'src/services/action/category_action'
import { GetSingleEvent, ResetEvent } from 'src/services/action/event_action'
import { StopLoading, StartLoading } from 'src/services/action/loading_action'
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'

const EditEvent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { eventId } = useParams()
    const event = useSelector(st => st.Event_reducer.event)
    const allCategories = useSelector(st => st.Category_reducer.allCategories)
    const allSponsors = useSelector(st => st.Sponsor_reducer.allSponsors)
    const loading = useSelector(st => st.Loading_reducer.loading)
    const [selectAllCategories, setSelectAllCategories] = useState([])
    const [selectAllSubcategories, setSelectAllSubcategories] = useState([])
    const [selectAllSponsors, setSelectAllSponsors] = useState([])
    const [selectedSponsors, setSelectedSponsors] = useState([])
    const [validated, setValidated] = useState(false)
    const [file, setFile] = useState()
    const [blob, setBlob] = useState('')
    const [eventDetails, setEventDetails] = useState({
        title: '',
        title_en: '',
        title_ru: '',
        topEvent: '',
        generalEvent: '',
        subcategory: '',
        description: '',
        description_en: '',
        description_ru: '',
    })
    const [activeKey, setActiveKey] = useState(1)

    useEffect(() => {
        dispatch(ResetEvent())
        dispatch(GetSingleEvent(eventId))
        dispatch(GetAllCategories())
        dispatch(GetAllSponsors())
    }, [eventId, dispatch])

    useEffect(() => {
        let categories = []
        let subcategories = []
        if (allCategories?.length) {
            allCategories?.forEach(element => {
                categories.push({ label: element?.name, value: element?._id })
            })
            setSelectAllCategories(categories)
            const selectedCategory = allCategories?.filter(category => category._id === eventDetails?.category)[0]
            selectedCategory?.subcategories?.forEach(subcategory => {
                subcategories.push({ label: subcategory?.name, value: subcategory?._id })
            })
            setSelectAllSubcategories(subcategories)
        }
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
                title_en: event?.title_en,
                title_ru: event?.title_ru,
                topEvent: event?.topEvent,
                generalEvent: event?.generalEvent,
                category: event?.category?._id,
                subcategory: '',
                description: event?.description,
                description_en: event?.description_en,
                description_ru: event?.description_ru,
            })

            let sponsors = []
            event?.sponsors?.forEach(element => {
                sponsors.push({ label: element?.name, value: element._id })
            })
            setSelectedSponsors(sponsors)
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
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity() !== false) {
            dispatch(StartLoading())
            const formdata = new FormData()
            const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
            formdata.append("image", file)
            formdata.append("id", eventId)
            formdata.append("title", eventDetails?.title)
            formdata.append("title_en", eventDetails?.title_en)
            formdata.append("title_ru", eventDetails?.title_ru)
            formdata.append("topEvent", eventDetails?.topEvent)
            formdata.append("generalEvent", eventDetails?.generalEvent)
            formdata.append("description", eventDetails?.description)
            formdata.append("description_en", eventDetails?.description_en?.description_en)
            formdata.append("description_ru", eventDetails?.description_ru)
            formdata.append("category", eventDetails.category)
            formdata.append("subcategories", eventDetails.subcategory)

            if (selectedSponsors?.length) {
                selectedSponsors?.forEach(element => {
                    formdata.append("sponsors[]", element.value)
                })
            }

            fetch(`${process.env.REACT_APP_HOSTNAME}/editEvent`, {
                method: 'PATCH',
                body: formdata,
                redirect: 'follow',
                headers: myHeaders,
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        dispatch(StopLoading())
                        alert('Միջոցառումը թարմացված է')
                        navigate('/all-events')
                    }
                })
                .catch(error => console.log('error', error));
        }
        setValidated(true)
    }

    return (<>
        {loading
            ? <Loading />
            : <div>
                <CNav variant="tabs" role="tablist">
                    <CNavItem role="presentation">
                        <CNavLink
                            active={activeKey === 1}
                            component="button"
                            role="tab"
                            aria-controls="home-tab-pane"
                            aria-selected={activeKey === 1}
                            onClick={() => setActiveKey(1)}
                        >
                            Հայերեն
                        </CNavLink>
                    </CNavItem>
                    <CNavItem role="presentation">
                        <CNavLink
                            active={activeKey === 2}
                            component="button"
                            role="tab"
                            aria-controls="profile-tab-pane"
                            aria-selected={activeKey === 2}
                            onClick={() => setActiveKey(2)}
                        >
                            English
                        </CNavLink>
                    </CNavItem>
                    <CNavItem role="presentation">
                        <CNavLink
                            active={activeKey === 3}
                            component="button"
                            role="tab"
                            aria-controls="contact-tab-pane"
                            aria-selected={activeKey === 3}
                            onClick={() => setActiveKey(3)}
                        >
                            Русский
                        </CNavLink>
                    </CNavItem>
                </CNav>
                <CTabContent>
                    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1} style={{ marginTop: '20px' }}>
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
                                <CFormSelect
                                    options={selectAllSubcategories}
                                    feedbackInvalid='Պարտադիր դաշտ'
                                    label="Ենթաբաժիններ"
                                    required
                                    onChange={(e) => setEventDetails({ ...eventDetails, subcategory: e.target.value })}
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
                                    placeholder=""
                                    defaultValue={event?.description}
                                    onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                                    rows={5}
                                />
                            </CCol>
                            <CCol xs={12}>
                                <CButton type="submit">Փոփոխել</CButton>
                            </CCol>
                        </CForm>
                    </CTabPane>
                    <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2} style={{ marginTop: '20px' }}>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue={event?.title_en}
                                onChange={(e) => setEventDetails({ ...eventDetails, title_en: e.target.value })}
                                feedbackInvalid='Required field'
                                label="Title"
                                required
                            />
                        </CCol>
                        <CCol md={12}>
                            <CFormTextarea
                                feedbackInvalid='Required field'
                                id="validationTextarea"
                                label="Description"
                                placeholder=""
                                defaultValue={event?.description_en}
                                onChange={(e) => setEventDetails({ ...eventDetails, description_en: e.target.value })}
                                rows={5}
                            />
                        </CCol>
                    </CTabPane>
                    <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3} style={{ marginTop: '20px' }}>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue={event?.title_ru}
                                onChange={(e) => setEventDetails({ ...eventDetails, title_ru: e.target.value })}
                                feedbackInvalid='Обязательное поле'
                                label="Название"
                                required
                            />
                        </CCol>
                        <CCol md={12}>
                            <CFormTextarea
                                feedbackInvalid='Обязательное поле'
                                id="validationTextarea"
                                label="Описание"
                                placeholder=""
                                defaultValue={event?.description_ru}
                                onChange={(e) => setEventDetails({ ...eventDetails, description_ru: e.target.value })}
                                rows={5}
                            />
                        </CCol>
                    </CTabPane>
                </CTabContent>
            </div>
        }
    </>)
}

export default EditEvent