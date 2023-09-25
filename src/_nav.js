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
    component: CNavGroup,
    name: 'Բաժիններ',
    to: '/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
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
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
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
    name: 'Ժանրեր',
    to: '/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Տեսնել բոլորը',
        to: '/all-genres',
      },
      {
        component: CNavItem,
        name: 'Ստեղծել նորը',
        to: '/create-genre',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Դահլճներ',
    to: '/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
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
]

export default _nav
