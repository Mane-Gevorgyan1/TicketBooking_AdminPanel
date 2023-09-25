import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPuzzle,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Գլխավոր',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'Նոր',
    },
  },
  {
    component: CNavTitle,
    name: 'Միջոցառումներ',
  },
  {
    component: CNavGroup,
    name: 'Միջոցառումներ',
    to: '/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Տեսնել բոլորը',
        to: '/all-events',
      },
      {
        component: CNavItem,
        name: 'Ստեղծել նորը',
        to: '/create-event',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Միջոցառումներ',
  },
  {
    component: CNavGroup,
    name: 'Միջոցառումներ',
    to: '/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Տեսնել բոլորը',
        to: '/all-events',
      },
      {
        component: CNavItem,
        name: 'Ստեղծել նորը',
        to: '/create-event',
      },
    ],
  },
]

export default _nav
