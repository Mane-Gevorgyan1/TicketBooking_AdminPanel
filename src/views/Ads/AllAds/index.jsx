import './style.css'
import { useEffect, useState } from 'react'
import { EachAd } from 'src/components/popup/eachAd'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllAds } from 'src/services/action/ad_action'
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'

const AllAds = () => {
    const dispatch = useDispatch()
    const ads = useSelector(st => st.Ad_reducer.ads)
    const [openAd, setOpenAd] = useState(false)
    const [selectedAd, setSelectedAd] = useState()

    useEffect(() => {
        dispatch(GetAllAds())
    }, [dispatch])

    return (
        <div>
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
                                {/* <CButton onClick={() => dispatch(DeleteEvent(e?._id))} color='danger'><CIcon icon={cilDelete} /></CButton> */}
                            </div>
                        </CCardBody>
                    </CCard>
                ))
                : <h4 className='noEvents'>Գովազդներ չեն գտնվել</h4>
            }
        </div>
    )
}

export default AllAds