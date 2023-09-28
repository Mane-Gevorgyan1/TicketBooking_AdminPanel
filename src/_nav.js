import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilApplications,
  cilNewspaper,
  cilPeople,
  cilScreenDesktop,
  cilSofa,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

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
    component: CNavGroup,
    name: 'Միջոցառումներ',
    to: '/',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
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
    component: CNavGroup,
    name: 'Բաժիններ',
    to: '/',
    icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Տեսնել բոլորը',
        to: '/all-categories',
      },
      {
        component: CNavItem,
        name: 'Ստեղծել նորը',
        to: '/create-category',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Հովանավորներ',
    to: '/',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Տեսնել բոլորը',
        to: '/all-sponsors',
      },
      {
        component: CNavItem,
        name: 'Ստեղծել նորը',
        to: '/create-sponsor',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Դահլիճներ',
    to: '/',
    icon: <CIcon icon={cilScreenDesktop} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Տեսնել բոլորը',
        to: '/all-halls',
      },
      {
        component: CNavItem,
        name: 'Ստեղծել նորը',
        to: '/create-hall',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Սեանսներ',
    to: '/',
    icon: <CIcon icon={cilSofa} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Տեսնել բոլորը',
        to: '/all-sessions',
      },
      {
        component: CNavItem,
        name: 'Ստեղծել նորը',
        to: '/create-session',
      },
    ],
  },
]

export default _nav
