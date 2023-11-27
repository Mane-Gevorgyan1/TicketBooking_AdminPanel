import React from 'react'

// Login
const Login = React.lazy(() => import('./views/pages/page404/Page404.js'))

// Dashboard
const Dashboard = React.lazy(() => import('./views/Dashboard'))

// Events
const AllEvents = React.lazy(() => import('./views/Events/AllEvents'))
const CreateEvent = React.lazy(() => import('./views/Events/CreateEvent'))
const EditEvent = React.lazy(() => import('./views/Events/EditEvent/index.jsx'))

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
const AllSessions = React.lazy(() => import('./views/Sessions/AllSessions'))
const CreateSession = React.lazy(() => import('./views/Sessions/CreateSession'))
const EditSession = React.lazy(() => import('./views/Sessions/EditSession'))

// Ads
const AllAds = React.lazy(() => import('./views/Ads/AllAds'))
const CreateAd = React.lazy(() => import('./views/Ads/CreateAd'))
const EditAd = React.lazy(() => import('./views/Ads/EditAd'))

// Feedback
const Feedback = React.lazy(() => import('./views/Feedback'))

// Moderators
const AllModerators = React.lazy(() => import('./views/Moderators/AllModerators'))
const CreateModerator = React.lazy(() => import('./views/Moderators/CreateModerator'))

// Tickets
const AllTickets = React.lazy(() => import('./views/Tickets/AllTickets'))
const SingleTicket = React.lazy(() => import('./views/Tickets/SingleTicket/index.jsx'))
const ReturnedTickets = React.lazy(() => import('./views/Tickets/ReturnedTickets'))
const SigleReturnedTicket = React.lazy(() => import('./views/Tickets/singleReturnedTicket'))
const SingleTicketCount = React.lazy(() => import('./views/singleTicketCount'))

const routes = [
  { path: '/login', exact: true, name: 'Login', element: Login },

  // { path: '/', exact: true, name: 'Գլխավոր' },
  { path: '/', exact: true, name: 'Dashboard', element: Dashboard },

  { path: '/all-events', name: 'Բոլոր միջոցառումները', element: AllEvents },
  { path: '/create-event', name: 'Ստեղծել միջոցառում', element: CreateEvent },
  { path: '/edit-event/:eventId', name: 'Փոփոխել միջոցառումը', element: EditEvent },

  { path: '/all-categories', name: 'Բոլոր բաժինները', element: AllCategories },
  { path: '/create-category', name: 'Ստեղծել բաժին', element: CreateCategory },

  { path: '/all-sponsors', name: 'Բոլոր հովանավորները', element: AllSponsors },
  { path: '/create-sponsor', name: 'Ստեղծել հովանավոր', element: CreateSponsor },

  { path: '/all-halls', name: 'Բոլոր դահլիճները', element: AllHalls },

  { path: '/all-sessions', name: 'Բոլոր սեանսները', element: AllSessions },
  { path: '/create-session', name: 'Ստեղծել սեանս', element: CreateSession },
  { path: '/edit-session/:id', name: 'Փոփոխել սեանսը', element: EditSession },

  { path: '/all-ads', name: 'Բոլոր գովազդները', element: AllAds },
  { path: '/create-ad', name: 'Ստեղծել գովազդ', element: CreateAd },
  { path: '/edit-ad/:id', name: 'Փոփոխել գովազդը', element: EditAd },

  { path: '/all-moderators', name: 'Մոդերատորներ', element: AllModerators },
  { path: '/create-moderator', name: 'Ստեղծել Մոդերատոր', element: CreateModerator },

  { path: '/feedback', name: 'Հետադարձ կապ', element: Feedback },

  { path: '/all-tickets', name: 'Ակտիվ Տոմսեր', element: AllTickets },
  { path: '/ticket/:ticketId', name: 'Տոմս', element: SingleTicket },
  { path: '/returned-tickets', name: 'Հետ վերադարձ', element: ReturnedTickets },
  { path: '/single-returned-ticket/:id', name: 'Հետ վերադարձ', element: SigleReturnedTicket },
  { path: '/single-ticket-count/:id', name: 'Հետ վերադարձ', element: SingleTicketCount },
]

export default routes 