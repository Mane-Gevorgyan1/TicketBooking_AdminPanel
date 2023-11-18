import './style.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteSession, GetAllSessions } from 'src/services/action/session_action'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CPagination, CRow } from '@coreui/react'

const AllSessions = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessions = useSelector(st => st.Session_reducer.sessions)
    const update = useSelector(st => st.Session_reducer.update)
    const loading = useSelector(st => st.Loading_reducer.loading)
    const pageInfo = useSelector(st => st.Session_reducer.pageInfo)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(GetAllSessions(currentPage))
    }, [dispatch, update, currentPage])

    return (<>
        {loading
            ? <Loading />
            : <div className='allSessions'>
                {sessions?.length > 0
                    ? sessions?.map((e, i) => (
                        <CCard className="mb-3 sessionCard" key={i}>
                            <CRow className="g-0">
                                <CCol>
                                    <CCardImage className='sessionImage' src={`${process.env.REACT_APP_IMAGE}/${e?.eventId?.image}`} />
                                    <CCardImage className='sessionImage' src={`${process.env.REACT_APP_IMAGE}/${e?.hallId?.image}`} />
                                </CCol>
                            </CRow>
                            <CCol>
                                <CCardBody>
                                    <CCardTitle>{e?.eventId?.title}</CCardTitle>
                                    <CCardTitle>{e?.hallId?.place}, {e.hallId?.hall}</CCardTitle>
                                    <CCardText>{e?.date?.split('T')[0]}, {e?.time}</CCardText>
                                    <CCardText>{e?.priceStart} - {e?.priceEnd} դրամ</CCardText>
                                    <div className='sessionButtons'>
                                        <span onClick={() => navigate(`/edit-session/${e?._id}`)}>Փոփոխել</span>
                                        <span onClick={() => dispatch(DeleteSession(e?._id))}>Հեռացնել</span>
                                    </div>
                                </CCardBody>
                            </CCol>
                        </CCard>
                    ))
                    : <span>Սեանսներ չկան</span>
                }

                {pageInfo?.totalPages > 1 &&
                    <div className='paginationWidth'>
                        <CPagination align="center">
                            <button onClick={() => pageInfo.currentPage !== 1 && setCurrentPage(pageInfo.currentPage - 1)} className='paginationBigButtons pgLeft'>Նախորդ</button>
                            {Array.from({ length: pageInfo.totalPages }, (_, index) => index + 1).map((e, i) => (
                                <button key={i} onClick={() => setCurrentPage(e)} className={pageInfo.currentPage === e ? 'activePagination myPagination' : 'myPagination'}>
                                    {e}
                                </button>
                            ))}
                            <button onClick={() => pageInfo.currentPage !== pageInfo.totalPages && setCurrentPage(pageInfo.currentPage + 1)} className='paginationBigButtons pgRight'>Հաջորդ</button>
                        </CPagination>
                    </div>
                }
            </div>
        }
    </>)
}

export default AllSessions