import React from 'react'

// Events
const AllEvents = React.lazy(() => import('./views/Events/AllEvents'))
const EditEvent = React.lazy(() => import('./views/Events/editEvent/index.jsx'))
const CreateEvent = React.lazy(() => import('./views/Events/CreateEvent'))

// Categories
const AllCategories = React.lazy(() => import('./views/Categories/AllCategories'))
const CreateCategory = React.lazy(() => import('./views/Categories/CreateCategory'))

// Sponsors
const AllSponsors = React.lazy(() => import('./views/Sponsors/AllSposors'))
const CreateSponsor = React.lazy(() => import('./views/Sponsors/CreateSponsor'))
const CreatHall = React.lazy(() => import('./views/Hall/CreatHall/index.jsx'))


const routes = [
  { path: '/', exact: true, name: 'Գլխավոր' },

  { path: '/all-events', name: 'Բոլոր միջոցառումները', element: AllEvents },
  { path: '/create-event', name: 'Ստեղծել միջոցառում', element: CreateEvent },
  { path: '/edit-event/:id', name: 'Փոփոխել միջոցառումը', element: EditEvent },

  { path: '/all-categories', name: 'Բոլոր բաժինները', element: AllCategories },
  { path: '/create-category', name: 'Ստեղծել բաժին', element: CreateCategory },

  { path: '/all-sponsors', name: 'Բոլոր հովանավորները', element: AllSponsors },
  { path: '/create-sponsor', name: 'Ստեղծել հովանավոր', element: CreateSponsor },

  { path: '/create-hall', name: 'Ստեղծել նորը', element: CreatHall },

]

export default routes 