import { FetchDelete, FetchGet, FetchPost } from "./fetchHelper"

export const GetAllEvents = (page) => { return FetchPost(`/getAllEvents?currentPage=${page}`, {}, 'allEvents', 'allEventsError') }
export const GetSingleEvent = (id) => { return FetchGet(`/singleEvent/${id}`, 'singleEvent') }
export const DeleteEvent = (id) => { return FetchDelete('/deleteEvent', { id }, 'update') }
export const ResetEvent = () => { return { type: 'resetEvent' } }