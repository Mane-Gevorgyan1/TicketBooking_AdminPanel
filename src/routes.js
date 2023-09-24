import React from 'react'

// Events
const AllEvents = React.lazy(() => import('./views/Events/AllEvents'))
const EditEvent = React.lazy(() => import('./views/Events/editEvent'))

const routes = [
  { path: '/', exact: true, name: 'Գլխավոր' },
  // { path: '/all-events', name: 'Բոլոր միջոցառումները', element: AllEvents },
  { path: '/all-events', name: 'Բոլոր միջոցառումները', element: EditEvent },
  { path: '/edit-event/:id', name: 'Փոփոխել միջոցառումը', element: EditEvent },
]

export default routes