import './style.css'
import CIcon from '@coreui/icons-react'
import { useEffect, useState } from 'react'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { cilDelete, cilPencil, cilPlus, cilSave } from '@coreui/icons'
import { CButton, CCard, CCardBody, CCardTitle, CFormInput, CListGroup, CListGroupItem } from '@coreui/react'
import { CreateSubcategory, DeleteCategory, DeleteSubcategory, EditCategory, EditSubcategory, GetAllCategories } from 'src/services/action/category_action'

const AllCategories = () => {
    const dispatch = useDispatch()
    const allCategories = useSelector(st => st.Category_reducer.allCategories)
    const update = useSelector(st => st.Category_reducer.update)
    const loading = useSelector(st => st.Loading_reducer.loading)
    const [editCategory, setEditCategory] = useState(null)
    const [newCategoryName, setNewCategoryName] = useState('')
    const [newCategoryName_en, setNewCategoryName_en] = useState('')
    const [newCategoryName_ru, setNewCategoryName_ru] = useState('')
    const [editSubcategory, setEditSubcategory] = useState(null)
    const [newSubcategoryName, setNewSubcategoryName] = useState('')
    const [newSubcategoryName_en, setNewSubcategoryName_en] = useState('')
    const [newSubcategoryName_ru, setNewSubcategoryName_ru] = useState('')
    const [createSubcategory, setCreateSubcategory] = useState(null)
    const [createSubcategoryName, setCreateSubcategoryName] = useState('')
    const [createSubcategoryName_en, setCreateSubcategoryName_en] = useState('')
    const [createSubcategoryName_ru, setCreateSubcategoryName_ru] = useState('')

    useEffect(() => {
        dispatch(GetAllCategories())
    }, [dispatch])

    useEffect(() => {
        dispatch(GetAllCategories())
        setEditCategory(null)
        setNewCategoryName('')
        setNewCategoryName_en('')
        setNewCategoryName_ru('')
        setEditSubcategory(null)
        setNewSubcategoryName('')
        setCreateSubcategory(null)
        setCreateSubcategoryName('')
        setNewSubcategoryName_en('')
        setNewSubcategoryName_ru('')
        setCreateSubcategoryName_en('')
        setCreateSubcategoryName_ru('')
    }, [update, dispatch])

    function handleCategoryEdit(category) {
        setNewCategoryName(category.name)
        setNewCategoryName_en(category.name_en)
        setNewCategoryName_ru(category.name_ru)
        setEditCategory(category._id)
    }

    function handleSubcategoryEdit(subcategory) {
        setNewSubcategoryName(subcategory.name)
        setNewSubcategoryName_en(subcategory.name_en)
        setNewSubcategoryName_ru(subcategory.name_ru)
        setEditSubcategory(subcategory?._id)
    }

    function createNewSubcategory(category) {
        setCreateSubcategory(category?._id)
        setCreateSubcategoryName('')
    }

    return (<>
        {loading
            ? <Loading />
            : <div className='allCategories'>
                {allCategories?.length > 0
                    ? allCategories?.map((category, index) => (
                        <CCard key={index} className='eachEventCard'>
                            <CCardBody>
                                {editCategory === category?._id
                                    ? <div className='categoryTitle'>
                                        <div className='categoryNameChange'>
                                            <div className='eachCategory'>
                                                <CFormInput
                                                    label='Hy'
                                                    placeholder={category?.name}
                                                    value={newCategoryName}
                                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                                />
                                                <div className='categoryIcons'>
                                                </div>
                                            </div>
                                            <div className='eachCategory'>
                                                <CFormInput
                                                    label='En'
                                                    placeholder={category?.name_en}
                                                    value={newCategoryName_en}
                                                    onChange={(e) => setNewCategoryName_en(e.target.value)}
                                                />
                                                <div className='categoryIcons'>
                                                </div>
                                            </div>
                                            <div className='eachCategory'>
                                                <CFormInput
                                                    label='Ru'
                                                    placeholder={category?.name_ru}
                                                    value={newCategoryName_ru}
                                                    onChange={(e) => setNewCategoryName_ru(e.target.value)}
                                                />
                                                <div className='categoryIcons'>
                                                </div>
                                            </div>
                                            <CButton onClick={() => dispatch(EditCategory(category._id, newCategoryName, newCategoryName_en, newCategoryName_ru))} color='success'>
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
                                        <div className='categoryNameChange'>
                                            <div className='eachCategory'>
                                                <CFormInput
                                                    label='Hy'
                                                    placeholder=''
                                                    value={createSubcategoryName}
                                                    onChange={(e) => setCreateSubcategoryName(e.target.value)}
                                                />
                                                <div className='categoryIcons'>
                                                </div>
                                            </div>
                                            <div className='eachCategory'>
                                                <CFormInput
                                                    label='En'
                                                    placeholder=''
                                                    value={createSubcategoryName_en}
                                                    onChange={(e) => setCreateSubcategoryName_en(e.target.value)}
                                                />
                                                <div className='categoryIcons'>
                                                </div>
                                            </div>
                                            <div className='eachCategory'>
                                                <CFormInput
                                                    label='Ru'
                                                    placeholder=''
                                                    value={createSubcategoryName_ru}
                                                    onChange={(e) => setCreateSubcategoryName_ru(e.target.value)}
                                                />
                                                <div className='categoryIcons'>
                                                </div>
                                            </div>
                                            <CButton onClick={() => dispatch(CreateSubcategory(category?._id, createSubcategoryName, createSubcategoryName_en, createSubcategoryName_ru))} color='success'>
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
                                                        <div className='categoryNameChange'>
                                                            <div className='eachCategory'>
                                                                <CFormInput
                                                                    label='Hy'
                                                                    placeholder={newSubcategoryName}
                                                                    value={newSubcategoryName}
                                                                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                                                                />
                                                                <div className='categoryIcons'>
                                                                </div>
                                                            </div>
                                                            <div className='eachCategory'>
                                                                <CFormInput
                                                                    label='En'
                                                                    placeholder={newSubcategoryName_en}
                                                                    value={newSubcategoryName_en}
                                                                    onChange={(e) => setNewSubcategoryName_en(e.target.value)}
                                                                />
                                                                <div className='categoryIcons'>
                                                                </div>
                                                            </div>
                                                            <div className='eachCategory'>
                                                                <CFormInput
                                                                    label='Ru'
                                                                    placeholder={newSubcategoryName_ru}
                                                                    value={newSubcategoryName_ru}
                                                                    onChange={(e) => setNewSubcategoryName_ru(e.target.value)}
                                                                />
                                                            </div>
                                                            <CButton onClick={() => dispatch(EditSubcategory(subcategory._id, newSubcategoryName, newSubcategoryName_en, newSubcategoryName_ru))} color='success'>
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
            </div >
        }
    </>)
}

export default AllCategories