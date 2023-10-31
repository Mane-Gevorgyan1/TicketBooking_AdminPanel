import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter style={{ marginTop: '20px' }}>
      <span className="ms-1">&copy; 2023 Shine Tickets</span>
    </CFooter>
  )
}

export default React.memo(AppFooter)
