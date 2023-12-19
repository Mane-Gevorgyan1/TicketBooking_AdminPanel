import './style.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { MultiSelect } from 'react-multi-select-component'
import { GetAllSponsors } from 'src/services/action/sponsor_action'
import { GetAllCategories } from 'src/services/action/category_action'
import { StopLoading, StartLoading } from 'src/services/action/loading_action'
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CNav, CNavItem, CNavLink, CSpinner, CTabContent, CTabPane } from '@coreui/react'

const CreateEvent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allCategories = useSelector(st => st.Category_reducer.allCategories)
    const allSponsors = useSelector(st => st.Sponsor_reducer.allSponsors)
    const loading = useSelector(st => st.Loading_reducer.loading)
    const [selectAllCategories, setSelectAllCategories] = useState([])
    const [selectAllSubcategories, setSelectAllSubcategories] = useState([])
    const [selectAllSponsors, setSelectAllSponsors] = useState([])
    const [selectedSponsors, setSelectedSponsors] = useState([])
    const [validated, setValidated] = useState(false)
    const [file, setFile] = useState()
    const [largeFile, setLargeFile] = useState()
    const [blob, setBlob] = useState()
    const [largeBlob, setLargeBlob] = useState()
    const [activeKey, setActiveKey] = useState(1)
    const [eventDetails, setEventDetails] = useState({
        title: '',
        title_en: '',
        title_ru: '',
        topEvent: false,
        generalEvent: false,
        category: '',
        subcategory: '',
        description: '',
        description_en: '',
        description_ru: '',
    })
    const [errors, setErrors] = useState({
        title_en: '',
        title_ru: '',
        description_en: '',
        description_ru: '',
        mainPage: ''
    })
    const mainPage = [
        { label: 'Գլխավոր', value: 'generalEvent' },
        { label: 'Թոփ', value: 'topEvent' },
        { label: 'Բոլորը', value: 'all' },
    ]
    const [selectedMainPage, setSelectedMainPage] = useState([])

    useEffect(() => {
        dispatch(GetAllCategories())
        dispatch(GetAllSponsors())
    }, [dispatch])

    useEffect(() => {
        let categories = [{ label: '', value: '' }]
        let subcategories = [{ label: '', value: '' }]
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
    }, [allCategories, eventDetails.category])

    useEffect(() => {
        let sponsors = []
        if (allSponsors?.length) {
            allSponsors?.forEach(element => {
                sponsors.push({ label: element?.name, value: element?._id })
            })
        }
        setSelectAllSponsors(sponsors)
    }, [allSponsors])

    function handleImageChange(e) {
        if (e.target.files.length) {
            setBlob(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
        }
    }

    function handleLargeImageChange(e) {
        if (e.target.files.length) {
            setLargeBlob(URL.createObjectURL(e.target.files[0]))
            setLargeFile(e.target.files[0])
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity() !== false) {
            if (!eventDetails?.title_en?.length) {
                setErrors({ ...errors, title_en: 'Անգլերեն անունը պարտադիր է' })
            } else if (!eventDetails?.title_ru?.length) {
                setErrors({ ...errors, title_en: '', description_en: '', title_ru: 'Ռուսերեն անունը պարտադիր է' })
            } else if (!selectedMainPage?.length) {
                setErrors({ ...errors, title_en: '', description_en: '', title_ru: '', mainPage: 'Առավելություն դաշտը պարտադիր է' })
            } else {
                dispatch(StartLoading())
                setErrors({
                    title_en: '',
                    title_ru: '',
                    description_en: '',
                    description_ru: '',
                    mainPage: '',
                })
                const formdata = new FormData()
                formdata.append("image", file)
                formdata.append("image", largeFile)
                formdata.append("title", eventDetails?.title)
                formdata.append("title_en", eventDetails?.title_en)
                formdata.append("title_ru", eventDetails?.title_ru)
                formdata.append("description", eventDetails?.description)
                formdata.append("description_en", eventDetails?.description_en)
                formdata.append("description_ru", eventDetails?.description_ru)
                formdata.append("category", eventDetails?.category)
                formdata.append("subcategories", eventDetails?.subcategory)

                if (selectedSponsors?.length > 0) {
                    selectedSponsors?.forEach(element => {
                        formdata.append("sponsors[]", element.value)
                    })
                }

                if (selectedMainPage.find(e => e.value === 'generalEvent')) {
                    formdata.append("generalEvent", true)
                } else {
                    formdata.append("generalEvent", false)
                }

                if (selectedMainPage.find(e => e.value === 'topEvent')) {
                    formdata.append("topEvent", true)
                } else {
                    formdata.append("topEvent", false)
                }

                fetch(`${process.env.REACT_APP_HOSTNAME}/createEvent`, {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    },
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            dispatch(StopLoading())
                            alert('Միջոցառումը ստեղծված է')
                            navigate('/all-events')
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        setValidated(true)
    }

    return (<>
        {loading
            ? <Loading />
            : <div>
                <CNav variant="tabs" role="tablist">
                    <CNavItem role="presentation" >
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
                            style={errors?.title_en?.length || errors?.description_en?.length ? { border: '1px solid red' } : {}}
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
                            style={errors?.title_ru?.length || errors?.description_ru?.length ? { border: '1px solid red' } : {}}
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
                                    required
                                    label='Փոքր նկար'
                                />
                            </CCol>
                            <CCol md={4}>
                                <img alt='' src={largeBlob} className='eventImage' />
                                <CFormInput
                                    type="file"
                                    onChange={handleLargeImageChange}
                                    feedbackInvalid='Պարտադիր դաշտ'
                                    label='Մեծ նկար'
                                />
                            </CCol>
                            <CCol md={4} />
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    defaultValue=''
                                    onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
                                    feedbackInvalid='Պարտադիր դաշտ'
                                    label="Վերնագիր"
                                    required
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormLabel>Առավելություն</CFormLabel>
                                <MultiSelect
                                    options={mainPage}
                                    value={selectedMainPage}
                                    onChange={setSelectedMainPage}
                                    labelledBy="Select"
                                    overrideStrings={{
                                        allItemsAreSelected: 'Բոլորն ընտրված են',
                                        clearSearch: 'Մաքրել որոնումը',
                                        clearSelected: 'Մաքրել ընտրվածները',
                                        noOptions: 'Ոչինչ չի գտնվել',
                                        search: 'Որոնել',
                                        selectAll: 'Ընտրել բոլորը',
                                        selectAllFiltered: 'Ընտրել բոլոր (ֆիլտրված)',
                                        selectSomeItems: 'Ընտրել...',
                                    }}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormSelect
                                    options={selectAllCategories}
                                    feedbackInvalid='Պարտադիր դաշտ'
                                    label="Բաժիններ"
                                    required
                                    onChange={(e) => setEventDetails({ ...eventDetails, category: e.target.value })}
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
                                    defaultValue={eventDetails?.description}
                                    onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                                    rows={5}
                                />
                            </CCol>
                            {(errors?.title_en?.length > 0 || errors?.description_en?.length > 0 || errors?.title_ru?.length > 0 || errors?.description_ru?.length > 0) && <span style={{ color: 'red' }}>Անգլերեն և ռուսերեն վերնագրերի դաշտերը պարտադիր են</span>}
                            {errors?.mainPage?.length > 0 && <span style={{ color: 'red' }}>{errors?.mainPage}</span>}
                            <CCol xs={12}>
                                <CButton disabled={loading} type="submit">
                                    {loading && <CSpinner component="span" size="sm" aria-hidden="true" />}
                                    Ստեղծել
                                </CButton>
                            </CCol>
                        </CForm>
                    </CTabPane>
                    <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2} style={{ marginTop: '20px' }}>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue=''
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
                                defaultValue=''
                                onChange={(e) => setEventDetails({ ...eventDetails, description_en: e.target.value })}
                                rows={5}
                            />
                        </CCol>
                    </CTabPane>
                    <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3} style={{ marginTop: '20px' }}>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                defaultValue=''
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
                                defaultValue=''
                                onChange={(e) => setEventDetails({ ...eventDetails, description_ru: e.target.value })}
                                rows={5}
                            />
                        </CCol>
                    </CTabPane>
                </CTabContent>
            </div >
        }
    </>)
}

export default CreateEvent