import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilApplications,
  cilBadge,
  cilGlobeAlt,
  cilMoney,
  cilNewspaper,
  cilPeople,
  cilScreenDesktop,
  cilSofa,
  cilSpeedometer,
  cilTags,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Գլխավոր',
    to: '/',
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
  {
    component: CNavGroup,
    name: 'Գովազդ',
    to: '/',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Տեսնել բոլորը',
        to: '/all-ads',
      },
      {
        component: CNavItem,
        name: 'Ստեղծել նորը',
        to: '/create-ad',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Մոդերատորներ',
    to: '/',
    icon: <CIcon icon={cilBadge} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Տեսնել բոլորը',
        to: '/all-moderators',
      },
      {
        component: CNavItem,
        name: 'Ստեղծել նորը',
        to: '/create-moderator',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Տոմսեր',
    to: '/',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Ակտիվ տոմսեր',
        to: '/all-tickets',
      },
      {
        component: CNavItem,
        name: 'Հետ վերադարձ',
        to: '/returned-tickets',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Հետադարձ կապ',
    to: '/feedback',
    icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
  },
]

export default _nav
