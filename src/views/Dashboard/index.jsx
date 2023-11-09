import './style.css'
import { useState } from 'react'
import { useSelector } from "react-redux"
import { CChart } from '@coreui/react-chartjs'
import { CFormInput, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTable } from "@coreui/react"

const Dashboard = () => {
  const user = useSelector(st => st.Auth_reducer.user)
  const [search, setSearch] = useState('')
  const [activeKey, setActiveKey] = useState(1)
  const [tableColumns, setTableColumns] = useState([
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
  ])
  const [tableData, setTableData] = useState([
    {
      id: 1,
      ticketNumber: 1234567890,
      date: '2023-04-11',
      name: 'Mane Gevorgyan',
      email: 'manegevorgyan1@gmail.com',
      phone: '+37498765432',
      paymentMethod: 'mastercard',
      paymentVerified: 'Այո',
      delivery: 'Այո',
      notes: 'This is a note',
    },
    {
      id: 2,
      ticketNumber: 1234567890,
      date: '2023-04-11',
      name: 'Otto',
      email: 'otto@mdo.com',
      phone: '+37498765432',
      paymentMethod: 'visa  ',
      paymentVerified: 'Այո',
      delivery: 'Ոչ',
      notes: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam dolor culpa animi possimus eligendi consequuntur assumenda? Error quod, ducimus nam architecto ab quos quisquam numquam labore veritatis ratione, sapiente aspernatur?',
    },
    {
      id: 3,
      ticketNumber: 1234567890,
      date: '2023-04-11',
      name: 'Otto',
      email: 'otto@mdo.com',
      phone: '+37498765432',
      paymentMethod: 'mastercard',
      paymentVerified: 'Այո',
      delivery: 'Այո',
      notes: '',
    },
    {
      id: 4,
      ticketNumber: 1234567890,
      date: '2023-04-11',
      name: 'Mane Gevorgyan',
      email: 'manegevorgyan1@gmail.com',
      phone: '+37498765432',
      paymentMethod: 'mastercard',
      paymentVerified: 'Այո',
      delivery: 'Այո',
      notes: '',
    },
    {
      id: 5,
      ticketNumber: 1234567890,
      date: '2023-04-11',
      name: 'Otto',
      email: 'otto@mdo.com',
      phone: '+37498765432',
      paymentMethod: 'visa  ',
      paymentVerified: 'Այո',
      delivery: 'Ոչ',
      notes: 'Lorem ipsum dolor sit',
    },
    {
      id: 6,
      ticketNumber: 1234567890,
      date: '2023-04-11',
      name: 'Otto',
      email: 'otto@mdo.com',
      phone: '+37498765432',
      paymentMethod: 'mastercard',
      paymentVerified: 'Այո',
      delivery: 'Այո',
      notes: 'This is a note',
    },
    {
      id: 7,
      ticketNumber: 1234567890,
      date: '2023-04-11',
      name: 'Mane Gevorgyan',
      email: 'manegevorgyan1@gmail.com',
      phone: '+37498765432',
      paymentMethod: 'mastercard',
      paymentVerified: 'Այո',
      delivery: 'Այո',
      notes: 'This is a note',
    },
    {
      id: 8,
      ticketNumber: 1234567890,
      date: '2023-04-11',
      name: 'Otto',
      email: 'otto@mdo.com',
      phone: '+37498765432',
      paymentMethod: 'visa  ',
      paymentVerified: 'Այո',
      delivery: 'Ոչ',
      notes: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    },
    {
      id: 9,
      ticketNumber: 1234567890,
      date: '2023-04-11',
      name: 'Otto',
      email: 'otto@mdo.com',
      phone: '+37498765432',
      paymentMethod: 'mastercard',
      paymentVerified: 'Այո',
      delivery: 'Այո',
      notes: 'This is a note',
    },
    {
      id: 10,
      ticketNumber: 1234567890,
      date: '2023-04-11',
      name: 'Otto',
      email: 'otto@mdo.com',
      phone: '+37498765432',
      paymentMethod: 'mastercard',
      paymentVerified: 'Այո',
      delivery: 'Այո',
      notes: 'This is a note',
    },
  ])
  const [chartLabels, setChartLabels] = useState(['Սևազգեստ կանայք', 'Մոխրոտը', 'No Makeup', 'Արա Մալիկյան'])
  const [chartBgColor, setChartBgColor] = useState(['#41B883', '#E46651', '#00D8FF', '#DD1B16'])
  const [chartData, setChartData] = useState([40, 20, 30, 10])

  return (
    <>
      {user?.roleId === 1
        ? <div>
          <h1>Վաճառված տոմսերը</h1>
          <CNav variant="tabs" role="tablist">
            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 1}
                component="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Այսօր
              </CNavLink>
            </CNavItem>
            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 2}
                component="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                Երեկ
              </CNavLink>
            </CNavItem>
            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 3}
                component="button"
                role="tab"
                aria-controls="contact-tab-pane"
                aria-selected={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                2 օր առաջ
              </CNavLink>
            </CNavItem>
            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 4}
                component="button"
                role="tab"
                aria-controls="disabled-tab-pane"
                aria-selected={activeKey === 4}
                onClick={() => setActiveKey(4)}
              >
                Բոլորը
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
              <div className='chartWrapper'>
                <CChart
                  className='chart'
                  type="doughnut"
                  data={{
                    labels: chartLabels,
                    datasets: [
                      {
                        backgroundColor: chartBgColor,
                        data: chartData,
                      },
                    ],
                  }}
                />
              </div>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
              <div className='chartWrapper'>
                <CChart
                  className='chart'
                  type="doughnut"
                  data={{
                    labels: chartLabels,
                    datasets: [
                      {
                        backgroundColor: chartBgColor,
                        data: chartData,
                      },
                    ],
                  }}
                />
              </div>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3}>
              <div className='chartWrapper'>
                <CChart
                  className='chart'
                  type="doughnut"
                  data={{
                    labels: chartLabels,
                    datasets: [
                      {
                        backgroundColor: chartBgColor,
                        data: chartData,
                      },
                    ],
                  }}
                />
              </div>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 4}>
              <div className='chartWrapper'>
                <CChart
                  className='chart'
                  type="doughnut"
                  data={{
                    labels: chartLabels,
                    datasets: [
                      {
                        backgroundColor: chartBgColor,
                        data: chartData,
                      },
                    ],
                  }}
                />
              </div>
            </CTabPane>
          </CTabContent>
          <br /> <br />

          <div className='buyerInfoWrapper'>
            <h1>Գնորդի տվյալներ</h1>
            <div className='searchWrapper'>
              <CFormInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Որոնել'
                type='number'
              />
              {search?.length > 0 &&
                <div className='searchDiv' onClick={() => window.location = `/ticket/${search}`}>
                  {search}
                </div>
              }
            </div>
          </div>
          <br />

          <CTable responsive striped columns={tableColumns}>
            <tbody>
              {tableData?.map((item, index) => (
                <tr key={index} onClick={() => window.location = `/ticket/${item?.ticketNumber}`} style={{ cursor: 'pointer' }}>
                  {tableColumns?.map(column => (
                    <td key={column.key}>{item[column.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </CTable>
        </div>
        : <h1>Welcome to Shine Ticket Dashboard</h1>
      }
    </>
  )
}

export default Dashboard
