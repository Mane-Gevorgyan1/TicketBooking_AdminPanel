import './style.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'src/components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { CFormInput, CPagination, CTable } from '@coreui/react'
import { ChangePaymentVerified, GetAllTickets, SearchTicket } from 'src/services/action/ticket_action'

const AllTickets = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tickets = useSelector(st => st.Ticket_reducer.tickets.tickets)
    const pageInfo = useSelector(st => st.Ticket_reducer.tickets)
    const update = useSelector(st => st.Ticket_reducer.update)
    const searchData = useSelector(st => st.Ticket_reducer.search)
    const loading = useSelector(st => st.Loading_reducer.loading)
    const tableColumns = [
        {
            key: 'id',
            label: '#',
            _props: { scope: 'col' },
        },
        {
            key: 'ticketNumber',
            label: 'Տոմսի համար',
            _props: { scope: 'col', className: 'ticketWidth' },
        },
        {
            key: 'date',
            label: 'Ամսաթիվ',
            _props: { scope: 'col', className: 'ticketWidth' },
        },
        {
            key: 'name',
            label: 'Անուն',
            _props: { scope: 'col', className: 'ticketWidth' },
        },
        {
            key: 'email',
            label: 'Էլ. հասցե',
            _props: { scope: 'col', className: 'ticketWidth' },
        },
        {
            key: 'phone',
            label: 'Հեռախոս',
            _props: { scope: 'col', className: 'ticketWidth' },
        },
        {
            key: 'paymentMethod',
            label: 'Վճարման մեթոդ',
            _props: { scope: 'col', className: 'ticketWidth' },
        },
        {
            key: 'paymentVerified',
            label: 'Վճարումը հաստատված է',
            _props: { scope: 'col', className: 'ticketWidth' },
        },
        {
            key: 'delivery',
            label: 'Առաքում',
            _props: { scope: 'col', className: 'ticketRowWidth' },
        },
        {
            key: 'notes',
            label: 'Նշումներ',
            _props: { scope: 'col', className: 'ticketNotes' },
        },
        {
            key: 'verify',
            label: 'Հաստատել վճարումը',
            _props: { scope: 'col', className: 'ticketWidth' },
        },
    ]
    const [tableData, setTableData] = useState([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(GetAllTickets(currentPage))
    }, [dispatch, currentPage, update])

    useEffect(() => {
        if (tickets?.length > 0) {
            let soldTickets = []
            tickets?.forEach((element, index) => {
                soldTickets.push({
                    id: index + 1,
                    ticketNumber: element?.ticketNumber,
                    date: `${tickets[0].createdAt.split('.')[0].split('T')[0]}, ${tickets[0].createdAt.split('.')[0].split('T')[1]}`,
                    name: element?.buyerName,
                    email: element?.buyerEmail,
                    phone: element?.buyerPhone,
                    paymentMethod: element?.paymentMethod,
                    paymentVerified: element?.paymentVerified === 'PAID' ? 'Այո' : 'Ոչ',
                    delivery: element?.delivery ? 'Այո' : 'Ոչ',
                    notes: element?.buyerNotes,
                    verify: element?.paymentVerified === 'PAID' ? false : true
                })
            })
            setTableData(soldTickets)
        }
    }, [tickets])

    function handleClick(event, ticket) {
        event.preventDefault()
        event.stopPropagation()
        dispatch(ChangePaymentVerified(ticket?.ticketNumber))
    }

    return (<>
        {loading
            ? <Loading />
            : <div>
                <div className='buyerInfoWrapper'>
                    <div className='searchWrapper'>
                        <CFormInput
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                dispatch(SearchTicket(e.target.value))
                            }}
                            placeholder='Որոնել'
                            type='number'
                        />
                        {search?.length > 0 && searchData?.length > 0
                            ? <div className='searchDiv'>
                                {searchData?.map((e, i) => (
                                    <div className='eachSearchItem' onClick={() => navigate(`/ticket/${e?.ticketNumber}`)} key={i}>
                                        <div>{e?.ticketNumber}</div>
                                    </div>
                                ))}
                            </div>
                            : search?.length > 0 && !searchData?.length ? <div className='searchDiv'>
                                <div className='eachSearchItem'>
                                    <div>Չի գտնվել</div>
                                </div>
                            </div> : ''
                        }
                    </div>
                </div>
                <br />

                <CTable responsive striped columns={tableColumns}>
                    <tbody>
                        {tableData?.map((item, index) => (
                            <tr key={index} onClick={() => navigate(`/ticket/${item?.ticketNumber}`)} style={{ cursor: 'pointer' }}>
                                {tableColumns?.map(column => {
                                    if (column.key === 'verify' && item[column.key]) {
                                        return <button onClick={(e) => handleClick(e, item)}>Հաստատել վճարումը</button>
                                    } else {
                                        return <td key={column.key}>{item[column.key]}</td>
                                    }
                                })}
                            </tr>
                        ))}
                    </tbody>
                </CTable>

                {pageInfo?.totalPages > 1 &&
                    <CPagination align="center">
                        <button onClick={() => pageInfo.currentPage !== 1 && setCurrentPage(pageInfo.currentPage - 1)} className='paginationBigButtons pgLeft'>Նախորդ</button>
                        {Array.from({ length: pageInfo.totalPages }, (_, index) => index + 1).map((e, i) => (
                            <button key={i} onClick={() => setCurrentPage(e)} className={pageInfo.currentPage === e ? 'activePagination myPagination' : 'myPagination'}>
                                {e}
                            </button>
                        ))}
                        <button onClick={() => pageInfo.currentPage !== pageInfo.totalPages && setCurrentPage(pageInfo.currentPage + 1)} className='paginationBigButtons pgRight'>Հաջորդ</button>
                    </CPagination>
                }

            </div>
        }
    </>)
}

export default AllTickets