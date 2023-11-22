import { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from "react-redux"
import { CPagination, CTable } from '@coreui/react'
import { GetSoldTickets } from 'src/services/action/ticket_action'

const Dashboard = () => {
  const dispatch = useDispatch()
  const tickets = useSelector(st => st.Ticket_reducer.soldTickets)
  const user = useSelector(st => st.Auth_reducer.user)
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
      key: 'orderId',
      label: 'orderId',
      _props: { scope: 'col', className: 'ticketWidth' },
    },
    {
      key: 'title',
      label: 'Վերնագիր',
      _props: { scope: 'col', className: 'ticketWidth' },
    },

  ]
  const [tableData, setTableData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  console.log(tickets);


  useEffect(() => {
    dispatch(GetSoldTickets(currentPage))
  }, [dispatch, currentPage])


  useEffect(() => {
    if (tickets?.tickets?.length > 0) {
      let soldTickets = []
      tickets?.tickets?.forEach((element, index) => {
        soldTickets.push({
          id: index + 1,
          ticketNumber: element?.ticketNumber,
          orderId: element?.orderId,
          title: element?.sessionId?.eventId?.title,
        })
      })
      setTableData(soldTickets)
    }
  }, [tickets])

  return (
    <>
      {user?.roleId === 1
        ? <div>
          <h1>Վաճառված տոմսերը</h1><br />
          <CTable responsive striped columns={tableColumns}>
            <tbody>
              {tableData?.map((item, index) => (
                <tr key={index} style={{ cursor: 'pointer' }}>
                  {tableColumns?.map(column => (
                    <td key={column.key}>{item[column.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </CTable>

          {tickets?.totalPages > 1 &&
            <CPagination align="center">
              <button onClick={() => tickets.currentPage !== 1 && setCurrentPage(tickets.currentPage - 1)} className='paginationBigButtons pgLeft'>Նախորդ</button>
              {Array.from({ length: tickets.totalPages }, (_, index) => index + 1).map((e, i) => (
                <button key={i} onClick={() => setCurrentPage(e)} className={tickets.currentPage === e ? 'activePagination myPagination' : 'myPagination'}>
                  {e}
                </button>
              ))}
              <button onClick={() => tickets.currentPage !== tickets.totalPages && setCurrentPage(tickets.currentPage + 1)} className='paginationBigButtons pgRight'>Հաջորդ</button>
            </CPagination>
          }
        </div>
        : <h1>Welcome to Shine Ticket Dashboard</h1>
      }
    </>
  )
}

export default Dashboard
