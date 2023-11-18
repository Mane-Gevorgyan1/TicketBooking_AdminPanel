import './style.css'
import CIcon from '@coreui/icons-react'
import { useEffect } from 'react'
import { cilDelete } from '@coreui/icons'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { CButton, CCard, CCardImage, CCardTitle } from '@coreui/react'
import { DeleteSponsor, GetAllSponsors } from 'src/services/action/sponsor_action'

const AllSponsors = () => {
    const dispatch = useDispatch()
    const update = useSelector(st => st.Sponsor_reducer.update)
    const sponsors = useSelector(st => st.Sponsor_reducer.allSponsors)
    const loading = useSelector(st => st.Loading_reducer.loading)

    useEffect(() => {
        dispatch(GetAllSponsors())
    }, [update, dispatch])

    return (<>
        {loading
            ? <Loading />
            : <div className='allSponsors'>
                {sponsors?.length > 0
                    ? sponsors?.map((category, i) => (
                        <CCard key={i}>
                            <CCardImage src={`${process.env.REACT_APP_IMAGE}/${category?.image}`}></CCardImage>
                            <div className='sponsorDetails'>
                                <CCardTitle>{category?.name}</CCardTitle>
                                <div className='sponsorButtons'>
                                    <CButton onClick={() => dispatch(DeleteSponsor(category?._id))} color='danger'><CIcon icon={cilDelete} /></CButton>
                                </div>
                            </div>
                        </CCard>
                    ))
                    : <h4 className='noEvents'>Հովանավորներ չկան</h4>
                }
            </div>
        }
    </>)
}

export default AllSponsors