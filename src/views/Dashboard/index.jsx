import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { CPagination, CTable } from '@coreui/react'
import { GetSoldTickets } from 'src/services/action/ticket_action'

const Dashboard = () => {
  const dispatch = useDispatch()
  const tickets = useSelector(st => st.Ticket_reducer.soldTickets)
  const ticketDetails = useSelector(st => st.Ticket_reducer.soldTicketsDetails)
  const user = useSelector(st => st.Auth_reducer.user)
  const tableColumns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'title',
      label: 'Վերնագիր',
      _props: { scope: 'col', className: 'ticketWidth' },
    },
    {
      key: 'count',
      label: 'Քանակ',
      _props: { scope: 'col', className: 'ticketWidth' },
    },
  ]
  const [tableData, setTableData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(GetSoldTickets(currentPage))
  }, [dispatch, currentPage])

  useEffect(() => {
    if (tickets?.length > 0) {
      let soldTickets = []
      tickets?.forEach((element, index) => {
        element?.value !== 'undefined' && soldTickets.push({
          id: index + 1,
          title: element?.value,
          count: element?.count
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
                <tr key={index}>
                  {tableColumns?.map(column => (
                    <td key={column.key}>{item[column.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </CTable>

          {ticketDetails?.totalPages > 1 &&
            <CPagination align="center">
              <button onClick={() => ticketDetails.currentPage !== 1 && setCurrentPage(ticketDetails.currentPage - 1)} className='paginationBigButtons pgLeft'>Նախորդ</button>
              {Array.from({ length: ticketDetails.totalPages }, (_, index) => index + 1).map((e, i) => (
                <button key={i} onClick={() => setCurrentPage(e)} className={ticketDetails.currentPage === e ? 'activePagination myPagination' : 'myPagination'}>
                  {e}
                </button>
              ))}
              <button onClick={() => ticketDetails.currentPage !== ticketDetails.totalPages && setCurrentPage(ticketDetails.currentPage + 1)} className='paginationBigButtons pgRight'>Հաջորդ</button>
            </CPagination>
          }
        </div>
        : <h1>Welcome to Shine Ticket Dashboard</h1>
      }
    </>
  )
}

export default Dashboard
