import './style.css'
import { useState } from 'react'
import { useSelector } from "react-redux"
import { CChart } from '@coreui/react-chartjs'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react"

const Dashboard = () => {
  const user = useSelector(st => st.Auth_reducer.user)
  const [activeKey, setActiveKey] = useState(1)
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
        </div>
        : <h1>Welcome to Shine Ticket Dashboard</h1>
      }
    </>
  )
}

export default Dashboard
