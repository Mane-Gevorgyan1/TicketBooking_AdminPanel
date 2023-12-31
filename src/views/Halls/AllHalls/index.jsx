import './style.css'
import { useEffect } from 'react'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllHalls } from 'src/services/action/hall_action'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'

const AllHalls = () => {
    const dispatch = useDispatch()
    const halls = useSelector(st => st.Hall_reducer.halls)
    const loading = useSelector(st => st.Loading_reducer.loading)

    useEffect(() => {
        dispatch(GetAllHalls())
    }, [dispatch])

    return (<>
        {loading
            ? <Loading />
            : <div className='allHalls'>
                {halls?.length > 0
                    ? halls?.map((e, i) => (
                        <CCard key={i} className='hallCards'>
                            <CCardImage orientation='top' src={`${process.env.REACT_APP_IMAGE}/${e?.image}`} />
                            <CCardBody>
                                <CCardTitle>{e?.place}, {e?.hall}</CCardTitle>
                                <div className='eventDetails'>
                                    <CCardText>{e?.country}, {e?.location}</CCardText>
                                </div>
                            </CCardBody>
                        </CCard>
                    ))
                    : <span>Դահլիճներ չկան</span>
                }
            </div>
        }
    </>)
}

export default AllHalls