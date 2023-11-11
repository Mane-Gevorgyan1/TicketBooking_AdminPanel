import { FetchGet, FetchPost } from "./fetchHelper"

export const GetAllTickets = (page) => { return FetchGet(`/getAllTickets?currentPage=${page}`, 'getAllTickets') }
export const SearchTicket = (search) => { return FetchPost('/searchTicket', { search }, 'searchTicket') }
export const getSingleTicket = (ticketNumber) => { return FetchPost('/singleTicket', { ticketNumber }, 'getSingleTicket') }