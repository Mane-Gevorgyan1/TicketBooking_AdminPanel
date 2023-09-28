import './style.css'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CButton, CCard, CCardBody, CFormInput } from '@coreui/react'
import { CreateNewCategory, ResetNavigate } from 'src/services/action/category_action'

const CreateCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [categoryName, setCategoryName] = useState('')
    const navigation = useSelector(st => st.Category_reducer.navigate)

    useEffect(() => {
        dispatch(ResetNavigate())
    }, [dispatch])

    useEffect(() => {
        if (navigation) {
            navigate('/all-categories')
        }
    }, [navigation, navigate])

    return (
        <CCard>
            <CCardBody>
                <div className='createCategory'>
                    <CFormInput
                        placeholder='Անվանում'
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <CButton disabled={!categoryName.length} onClick={() => dispatch(CreateNewCategory(categoryName))}>
                        <CIcon icon={cilSave} />
                    </CButton>
                </div>
            </CCardBody>
        </CCard>
    )
}

export default CreateCategory