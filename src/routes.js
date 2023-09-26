import React from 'react'

// Events
const AllEvents = React.lazy(() => import('./views/Events/AllEvents'))
const EditEvent = React.lazy(() => import('./views/Events/editEvent'))

// Genres
const AllGenres = React.lazy(() => import('./views/Genres/AllGenres'))
const CreateGenre = React.lazy(() => import('./views/Genres/CreateGenre'))

const routes = [
  { path: '/', exact: true, name: 'Գլխավոր' },
  { path: '/all-events', name: 'Բոլոր միջոցառումները', element: AllEvents },
  { path: '/edit-event/:id', name: 'Փոփոխել միջոցառումը', element: EditEvent },
  { path: '/all-genres', name: 'Բոլոր ժանրերը', element: AllGenres },
  { path: '/create-genre', name: 'Ստեղծել ժանր', element: CreateGenre },
]

export default routes