import './style.css'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { CButton, CCard, CCardBody, CFormInput } from '@coreui/react'
import { CreateNewCategory, ResetNavigate } from 'src/services/action/category_action'

const CreateCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(st => st.Loading_reducer.loading)
    const navigation = useSelector(st => st.Category_reducer.navigate)
    const [categoryName, setCategoryName] = useState('')
    const [categoryName_en, setCategoryName_en] = useState('')
    const [categoryName_ru, setCategoryName_ru] = useState('')

    useEffect(() => {
        dispatch(ResetNavigate())
    }, [dispatch])

    useEffect(() => {
        if (navigation) {
            alert('Բաժինը ստեղծված է')
            navigate('/all-categories')
        }
    }, [navigation, navigate])

    return (<>
        {loading
            ? <Loading />
            : <CCard>
                <CCardBody>
                    <div className='createCategory'>
                        <CFormInput
                            placeholder='Անվանում'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>
                </CCardBody>
                <CCardBody>
                    <div className='createCategory'>
                        <CFormInput
                            placeholder='Title'
                            value={categoryName_en}
                            onChange={(e) => setCategoryName_en(e.target.value)}
                        />
                    </div>
                </CCardBody>
                <CCardBody>
                    <div className='createCategory'>
                        <CFormInput
                            placeholder='Название'
                            value={categoryName_ru}
                            onChange={(e) => setCategoryName_ru(e.target.value)}
                        />
                    </div>
                </CCardBody>

                <CButton disabled={!categoryName.length || !categoryName_en.length || !categoryName_ru.length} onClick={() => dispatch(CreateNewCategory(categoryName, categoryName_en, categoryName_ru))}>
                    <CIcon icon={cilSave} /> &nbsp;
                    Ստեղծել
                </CButton>
            </CCard>
        }
    </>)
}

export default CreateCategory