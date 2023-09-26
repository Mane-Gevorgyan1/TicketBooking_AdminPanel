import './style.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import { GetAllGenres } from 'src/services/action/genre_action'

const AllGenres = () => {
    const dispatch = useDispatch()
    const genres = useSelector(st => st.Genre_reducer.allGenres)

    useEffect(() => {
        dispatch(GetAllGenres())
    }, [dispatch])

    return (
        <div className='allGenres'>
            {genres.length > 0
                ? genres?.map((e, i) => (
                    <CCard style={{ width: 'fit-content' }} key={i}>
                        <CCardBody>
                            <CCardTitle>{e?.name}</CCardTitle>
                        </CCardBody>
                    </CCard>
                ))
                : <h4 className='noEvents'>Ժանրեր չեն գտնվել</h4>
            }
        </div>
    )
}

export default AllGenres