import './style.css'
import CIcon from '@coreui/icons-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cilDelete, cilPencil, cilPlus, cilSave } from '@coreui/icons'
import { CreateSubcategory, DeleteCategory, DeleteSubcategory, EditCategory, EditSubcategory, GetAllCategories } from 'src/services/action/category_action'
import { CButton, CCard, CCardBody, CCardTitle, CFormInput, CListGroup, CListGroupItem } from '@coreui/react'

const AllCategories = () => {
    const dispatch = useDispatch()
    const allCategories = useSelector(st => st.Category_reducer.allCategories)
    const update = useSelector(st => st.Category_reducer.update)
    const [editCategory, setEditCategory] = useState(null)
    const [newCategoryName, setNewCategoryName] = useState('')
    const [editSubcategory, setEditSubcategory] = useState(null)
    const [newSubcategoryName, setNewSubcategoryName] = useState('')
    const [createSubcategory, setCreateSubcategory] = useState(null)
    const [createSubcategoryName, setCreateSubcategoryName] = useState('')

    useEffect(() => {
        dispatch(GetAllCategories())
    }, [dispatch])

    useEffect(() => {
        dispatch(GetAllCategories())
        setEditCategory(null)
        setNewCategoryName('')
        setEditSubcategory(null)
        setNewSubcategoryName('')
        setCreateSubcategory(null)
        setCreateSubcategoryName('')
    }, [update, dispatch])

    function handleCategoryEdit(category) {
        setNewCategoryName(category.name)
        setEditCategory(category._id)
    }

    function handleSubcategoryEdit(subcategory) {
        setNewSubcategoryName(subcategory.name)
        setEditSubcategory(subcategory?._id)
    }

    function createNewSubcategory(category) {
        setCreateSubcategory(category?._id)
        setCreateSubcategoryName('')
    }

    return (
        <div className='allCategories'>
            {allCategories?.length > 0
                ? allCategories?.map((category, index) => (
                    <CCard key={index}>
                        <CCardBody>
                            {editCategory === category?._id
                                ? <div className='categoryTitle'>
                                    <CFormInput
                                        placeholder={category?.name}
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                    />
                                    <div className='categoryIcons'>
                                        <CButton onClick={() => dispatch(EditCategory(category._id, newCategoryName))} color='success'>
                                            <CIcon icon={cilSave} />
                                        </CButton>
                                    </div>
                                </div>
                                : <div className='categoryTitle'>
                                    <CCardTitle>{category?.name}</CCardTitle>
                                    <div className='categoryIcons'>
                                        <CButton onClick={() => handleCategoryEdit(category)}>
                                            <CIcon icon={cilPencil} />
                                        </CButton>
                                        <CButton color='danger' onClick={() => dispatch(DeleteCategory(category?._id))}>
                                            <CIcon icon={cilDelete} />
                                        </CButton>
                                    </div>
                                </div>
                            }
                            {createSubcategory === category?._id
                                ? <div className='categoryTitle'>
                                    <CFormInput
                                        placeholder=''
                                        value={createSubcategoryName}
                                        onChange={(e) => setCreateSubcategoryName(e.target.value)}
                                    />
                                    <div className='categoryIcons'>
                                        <CButton onClick={() => dispatch(CreateSubcategory(category?._id, createSubcategoryName))} color='success'>
                                            <CIcon icon={cilSave} />
                                        </CButton>
                                    </div>
                                </div>
                                : <CButton onClick={() => createNewSubcategory(category)}><CIcon icon={cilPlus} /></CButton>
                            }
                            <CListGroup flush>
                                {category?.subcategories?.length > 0 &&
                                    category?.subcategories?.map((subcategory, subIndex) => (
                                        <CListGroupItem className="d-flex justify-content-between align-items-center" key={subIndex}>
                                            {editSubcategory === subcategory?._id
                                                ? <div className='categoryTitle'>
                                                    <CFormInput
                                                        placeholder={subcategory?.name}
                                                        value={newSubcategoryName}
                                                        onChange={(e) => setNewSubcategoryName(e.target.value)}
                                                    />
                                                    <div className='categoryIcons'>
                                                        <CButton onClick={() => dispatch(EditSubcategory(subcategory._id, newSubcategoryName))} color='success'>
                                                            <CIcon icon={cilSave} />
                                                        </CButton>
                                                    </div>
                                                </div>
                                                : <div className='categoryTitle'>
                                                    {subcategory?.name}
                                                    <div className='categoryIcons'>
                                                        <CButton onClick={() => handleSubcategoryEdit(subcategory)}>
                                                            <CIcon icon={cilPencil} />
                                                        </CButton>
                                                        <CButton onClick={() => dispatch(DeleteSubcategory(subcategory?._id))} color='danger'>
                                                            <CIcon icon={cilDelete} />
                                                        </CButton>
                                                    </div>
                                                </div>
                                            }
                                        </CListGroupItem>
                                    ))}
                            </CListGroup>
                        </CCardBody>
                    </CCard>
                ))
                : <h4 className='noEvents'>Բաժիններ չկան</h4>
            }
        </div>
    )
}

export default AllCategories