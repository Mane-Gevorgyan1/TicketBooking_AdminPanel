import './style.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import { GetReturnedTickets } from 'src/services/action/ticket_action'

const ReturnedTickets = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tickets = useSelector(st => st.Ticket_reducer.returnedTickets)
    const update = useSelector(st => st.Ticket_reducer.update)
    const loading = useSelector(st => st.Loading_reducer.loading)

    useEffect(() => {
        dispatch(GetReturnedTickets())
    }, [dispatch, update])

    return (<>
        {loading
            ? <Loading />
            : <div className='returnedTickets'>
                {tickets?.length > 0
                    ? tickets?.map((e, i) => (
                        <CCard style={{ width: '18rem', cursor: 'pointer' }} key={i} onClick={() => navigate(`/single-returned-ticket/${e?._id}`)}>
                            <CCardBody>
                                <CCardTitle>Տոմսի համար: {e?.ticketNumber}</CCardTitle>
                            </CCardBody>
                        </CCard>
                    ))
                    : <h4>Հետ վերաձարձված տոմսեր չկան</h4>
                }
            </div>
        }
    </>)
}

export default ReturnedTickets