import React from 'react'

// Events
const AllEvents = React.lazy(() => import('./views/Events/AllEvents/index'))

const routes = [
  { path: '/', exact: true, name: 'Գլխավոր' },
  { path: '/all-events', name: 'Բոլոր միջոցառումները', element: AllEvents },
]

export default routes
