import React from 'react'

// Events
const AllEvents = React.lazy(() => import('./views/Events/AllEvents'))
const EditEvent = React.lazy(() => import('./views/Events/EditEvent'))
const CreateEvent = React.lazy(() => import('./views/Events/CreateEvent'))

// Genres
const AllGenres = React.lazy(() => import('./views/Genres/AllGenres'))
const CreateGenre = React.lazy(() => import('./views/Genres/CreateGenre'))

// Categories
const AllCategories = React.lazy(() => import('./views/Categories/AllCategories'))
const CreateCategory = React.lazy(() => import('./views/Categories/CreateCategory'))

const routes = [
  { path: '/', exact: true, name: 'Գլխավոր' },
  { path: '/all-events', name: 'Բոլոր միջոցառումները', element: AllEvents },
  { path: '/create-event', name: 'Ստեղծել միջոցառում', element: CreateEvent },
  { path: '/edit-event/:id', name: 'Փոփոխել միջոցառումը', element: EditEvent },

  { path: '/all-genres', name: 'Բոլոր ժանրերը', element: AllGenres },
  { path: '/create-genre', name: 'Ստեղծել ժանր', element: CreateGenre },

  { path: '/all-categories', name: 'Բոլոր Բաժինները', element: AllCategories },
  { path: '/create-category', name: 'Ստեղծել Բաժին', element: CreateCategory },
]

export default routes 