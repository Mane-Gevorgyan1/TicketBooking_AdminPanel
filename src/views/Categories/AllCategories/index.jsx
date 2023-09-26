import './style.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import { GetAllCategories } from 'src/services/action/category_action'

const AllCategories = () => {
    const dispatch = useDispatch()
    const categories = useSelector(st => st.Category_reducer.categories)

    useEffect(() => {
        dispatch(GetAllCategories())
    }, [dispatch])

    return (
        <div className='allGenres'>
            {categories.length > 0
                ? categories?.map((e, i) => (
                    <CCard style={{ width: 'fit-content' }} key={i}>
                        <CCardBody>
                            <CCardTitle>{e?.name}</CCardTitle>
                        </CCardBody>
                    </CCard>
                ))
                : <h4 className='noEvents'>Բաժիններ չեն գտնվել</h4>
            }
        </div>
    )
}

export default AllCategories