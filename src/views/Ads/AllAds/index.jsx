import './style.css'
import { useEffect, useState } from 'react'
import { Loading } from 'src/components/loading'
import { EachAd } from 'src/components/popup/eachAd'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteAd, GetAllAds } from 'src/services/action/ad_action'
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDelete } from '@coreui/icons'

const AllAds = () => {
    const dispatch = useDispatch()
    const ads = useSelector(st => st.Ad_reducer.ads)
    const loading = useSelector(st => st.Loading_reducer.loading)
    const [openAd, setOpenAd] = useState(false)
    const [selectedAd, setSelectedAd] = useState()
    const update = useSelector(st => st.Ad_reducer.update)

    useEffect(() => {
        dispatch(GetAllAds())
    }, [dispatch, update])

    return (<>
        {loading
            ? <Loading />
            : <div className='allAds'>
                {openAd &&
                    <EachAd
                        open={openAd}
                        setOpen={setOpenAd}
                        ad={selectedAd}
                    />
                }
                {ads?.length > 0
                    ? ads?.map((e, i) => (
                        <CCard className='eachEventCard' key={i}>
                            <CCardImage orientation='top' src={`${process.env.REACT_APP_IMAGE}/${e?.image}`} onClick={() => {
                                setSelectedAd(e)
                                setOpenAd(true)
                            }} />
                            <CCardBody>
                                <CCardTitle>{e?.title}</CCardTitle>
                                <div className='eventDetails'>
                                    <CCardText className='adText'>{e?.text}</CCardText>
                                    <CButton onClick={() => dispatch(DeleteAd(e?._id))} color='danger'><CIcon icon={cilDelete} /></CButton>
                                </div>
                            </CCardBody>
                        </CCard>
                    ))
                    : <h4 className='noEvents'>Գովազդներ չեն գտնվել</h4>
                }
            </div>
        }
    </>)
}

export default AllAds