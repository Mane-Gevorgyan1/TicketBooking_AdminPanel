import './style.css'
import { useEffect } from 'react'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { CButton, CCard, CCardBody, CCardTitle } from '@coreui/react'
import { DeleteReturnedTickets, GetReturnedTickets } from 'src/services/action/ticket_action'

const ReturnedTickets = () => {
    const dispatch = useDispatch()
    const tickets = useSelector(st => st.Ticket_reducer.returnedTickets)
    const update = useSelector(st => st.Ticket_reducer.update)
    const loading = useSelector(st => st.Loading_reducer.loading)

    useEffect(() => {
        dispatch(GetReturnedTickets())
    }, [dispatch, update])

    function handleReturn(event) {
        dispatch(DeleteReturnedTickets(event?._id))
    }

    return (<>
        {loading
            ? <Loading />
            : <div className='returnedTickets'>
                {tickets?.length > 0
                    ? tickets?.map((e, i) => (
                        <CCard style={{ width: '18rem' }} key={i}>
                            <CCardBody>
                                <CCardTitle>orderId: {e?.orderId}</CCardTitle>
                                <CButton onClick={() => handleReturn(e)}>Վերադարձված է</CButton>
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