import { FetchGet, FetchPost } from "./fetchHelper"

export const GetAllEvents = (page, category) => { return FetchPost(`/getAllEvents?currentPage=${page}`, { category }, 'allEvents') }