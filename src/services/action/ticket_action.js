import { FetchDelete, FetchGet, FetchPatch, FetchPost } from "./fetchHelper"

export const GetAllTickets = (page) => { return FetchGet(`/getAllTickets?currentPage=${page}`, 'getAllTickets') }
export const SearchTicket = (search) => { return FetchPost('/searchTicket', { search }, 'searchTicket') }
export const getSingleTicket = (ticketNumber) => { return FetchPost('/singleTicket', { ticketNumber }, 'getSingleTicket') }
export const ReturnTicket = (sessionId, seatId, ticketNumber, orderId) => { return FetchPatch('/returnTicket', { sessionId, seatId, ticketNumber, orderId }, 'returnTicket') }
export const GetReturnedTickets = ()  => { return FetchGet('/getReturnedTickets', 'getReturnedTickets')}
export const DeleteReturnedTickets = (id) => {return FetchDelete('/deleteReturnTicket', {id}, 'deleteReturnTicket')}