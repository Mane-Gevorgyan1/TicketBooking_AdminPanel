import React from 'react'

// Events
const AllEvents = React.lazy(() => import('./views/Events/AllEvents'))
const EditEvent = React.lazy(() => import('./views/Events/EditEvent/index.jsx'))
const CreateEvent = React.lazy(() => import('./views/Events/CreateEvent'))

// Categories
const AllCategories = React.lazy(() => import('./views/Categories/AllCategories'))
const CreateCategory = React.lazy(() => import('./views/Categories/CreateCategory'))

// Sponsors
const AllSponsors = React.lazy(() => import('./views/Sponsors/AllSposors'))
const CreateSponsor = React.lazy(() => import('./views/Sponsors/CreateSponsor'))

// Halls
const AllHalls = React.lazy(() => import('./views/Halls/AllHalls'))
// const CreateHall = React.lazy(() => import('./views/Halls/CreateHall'))

// Sessions
const CreateSession = React.lazy(() => import('./views/Sessions/CreateSession'))
const AllSessions = React.lazy(() => import('./views/Sessions/AllSessions'))
const EditSession = React.lazy(() => import('./views/Sessions/EditSession'))

const routes = [
  { path: '/', exact: true, name: 'Գլխավոր' },

  { path: '/all-events', name: 'Բոլոր միջոցառումները', element: AllEvents },
  { path: '/create-event', name: 'Ստեղծել միջոցառում', element: CreateEvent },
  { path: '/edit-event/:id', name: 'Փոփոխել միջոցառումը', element: EditEvent },

  { path: '/all-categories', name: 'Բոլոր բաժինները', element: AllCategories },
  { path: '/create-category', name: 'Ստեղծել բաժին', element: CreateCategory },

  { path: '/all-sponsors', name: 'Բոլոր հովանավորները', element: AllSponsors },
  { path: '/create-sponsor', name: 'Ստեղծել հովանավոր', element: CreateSponsor },

  { path: '/all-halls', name: 'Բոլոր դահլիճները', element: AllHalls },
  // { path: '/create-hall', name: 'Ստեղծել դահլիճ', element: CreateHall },

  { path: '/all-sessions', name: 'Բոլոր սեանսները', element: AllSessions },
  { path: '/create-session', name: 'Ստեղծել սեանս', element: CreateSession },
  { path: '/edit-session/:id', name: 'Փոփոխել սեանսը', element: EditSession },
]

export default routes 