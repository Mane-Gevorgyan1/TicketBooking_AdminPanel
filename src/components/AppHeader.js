import React from 'react'
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
} from '@coreui/react'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <h1>Shine Tickets Dashboard</h1>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
