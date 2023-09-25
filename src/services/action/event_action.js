import { FetchGet, FetchPost } from "./fetchHelper"

export const GetAllEvents = (page, category) => { return FetchPost(`/getAllEvents?currentPage=${page}`, { category }, 'allEvents') }
export const GetSingleEvent = (id) => {return FetchGet(`/singleEvent/${id}`, 'singleEvent')}
export const GetAllCategories = () => {return FetchGet('/getCategories', 'getAllCategories')}