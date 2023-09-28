import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MultiSelect } from 'react-multi-select-component'
import { GetAllGenres } from 'src/services/action/genre_action'
import { GetAllSponsors } from 'src/services/action/sponsor_action'
import { GetAllCategories } from 'src/services/action/category_action'
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea } from '@coreui/react'

const CreateEvent = () => {
    const dispatch = useDispatch()
    const allCategories = useSelector(st => st.Event_reducer.categories)
    // const allGenres = useSelector(st => st.Genre_reducer.allGenres)
    // const [selectAllGenres, setSelectAllGenres] = useState([])
    // const [selectedGenres, setSelectedGenres] = useState([])
    const allSponsors = useSelector(st => st.Sponsor_reducer.allSponsors)
    const [selectAllCategories, setSelectAllCategories] = useState([])
    const [selectAllSponsors, setSelectAllSponsors] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedSponsors, setSelectedSponsors] = useState([])
    const [validated, setValidated] = useState(false)
    const [file, setFile] = useState()
    const [blob, setBlob] = useState()
    const [eventDetails, setEventDetails] = useState({
        title: '',
        topEvent: false,
        generalEvent: false,
        category: selectAllCategories[0],
        genres: [],
        sponsors: [],
        description: ''
    })
    const [allSubcategories, setAllSubcategories] = useState([])
    const [selectedSubcategories, setSelectedSubcategories] = useState([])

    useEffect(() => {
        dispatch(GetAllCategories())
        dispatch(GetAllGenres())
        dispatch(GetAllSponsors())
    }, [dispatch])

    // useEffect(() => {
    //     let genres = []
    //     if (allGenres?.length) {
    //         allGenres?.forEach(element => {
    //             genres.push({ label: element?.name, value: element?._id })
    //         })
    //         setSelectAllGenres(genres)
    //     }
    // }, [allGenres])

    useEffect(() => {
        let categories = []
        if (allCategories?.length) {
            allCategories?.forEach(element => {
                categories.push({ label: element?.name, value: element?._id })
            })
            setSelectAllCategories(categories)
        }

        if (selectedCategories) {
            let myAllSubcategories = []
            const category = allCategories.filter(e => e._id === eventDetails?.category)[0]
            console.log(category);
            category?.subcategories.forEach(subcategory => {
                myAllSubcategories.push({ label: subcategory.name, value: subcategory._id })
            })
            setAllSubcategories(myAllSubcategories)
        }
    }, [allCategories, selectedCategories, eventDetails])

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
    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            const formdata = new FormData()
            formdata.append("image", file)
            formdata.append("title", eventDetails?.title)
            formdata.append("topEvent", eventDetails?.topEvent)
            formdata.append("generalEvent", eventDetails?.generalEvent)
            formdata.append("description", eventDetails?.description)
            formdata.append("category", eventDetails?.category)
            // if (selectedCategories?.length) {
            //     selectedCategories?.forEach(element => {
            //         formdata.append("category[]", element.value)
            //     })
            // }

            if (selectedSubcategories?.length) {
                selectedSubcategories?.forEach(element => {
                    formdata.append("subcategories[]", element.value)
                })
            }
            // if (selectedGenres?.length) {
            //     selectedGenres?.forEach(element => {
            //         formdata.append("genres[]", element.value)
            //     })
            // }
            if (selectedSponsors?.length) {
                selectedSponsors?.forEach(element => {
                    formdata.append("sponsors[]", element.value)
                })
            }
            fetch(`${process.env.REACT_APP_HOSTNAME}/createEvent`, {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.success) {
                        alert('Միջոցառումը ստեղծված է')
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
                        onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Վերնագիր"
                        required
                    />
                </CCol>
                <CCol md={4}>
                    <CFormSelect
                        defaultValue='all'
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Առավելություն"
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
                        <option value={'all'}>Բոլորը</option>
                    </CFormSelect>
                </CCol>
                <CCol md={4}>
                    {/* <CFormLabel>Բաժիններ</CFormLabel> */}
                    {/* <MultiSelect
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
                    /> */}
                    <CFormSelect
                        options={selectAllCategories}
                        feedbackInvalid='Պարտադիր դաշտ'
                        label="Բաժիններ"
                        required
                        onChange={(e) => setEventDetails({ ...eventDetails, category: e.target.value })}
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
                {/* <CCol md={4}>
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
                </CCol> */}
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
                        defaultValue=''
                        onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                        rows={5}
                    />
                </CCol>
                <CCol xs={12}>
                    <CButton color="primary" type="submit">Ստեղծել</CButton>
                </CCol>
            </CForm>
        </div>
    )
}

export default CreateEvent