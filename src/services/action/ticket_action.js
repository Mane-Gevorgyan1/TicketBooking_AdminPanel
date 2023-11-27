import { FetchDelete, FetchGet, FetchPatch, FetchPost, FetchSearch } from "./fetchHelper"

export const GetAllTickets = (page) => { return FetchGet(`/getAllTickets?currentPage=${page}`, 'getAllTickets') }
export const SearchTicket = (search) => { return FetchSearch('/searchTicket', { search }, 'searchTicket') }
export const getSingleTicket = (ticketNumber) => { return FetchPost('/singleTicket', { ticketNumber }, 'getSingleTicket') }
export const ReturnTicket = (sessionId, seatId, ticketNumber, orderId) => { return FetchPatch('/returnTicket', { sessionId, seatId, ticketNumber, orderId }, 'returnTicket') }
export const GetReturnedTickets = () => { return FetchGet('/getReturnedTickets', 'getReturnedTickets') }
export const DeleteReturnedTickets = (id) => { return FetchDelete('/deleteReturnTicket', { id }, 'deleteReturnTicket') }
export const ResetTickets = () => { return { type: 'resetTicket' } }
export const GetSoldTickets = (page) => { return FetchGet(`/soldTickets?currentPage=${page}`, 'getSoldTickets') }
export const GetSingleReturnedTicket = (id) => { return FetchGet(`/getSingleReturnedTicket/${id}`, 'getSingleReturnedTicket') }
export const DeleteReturnedTicket = (id) => { return FetchDelete('/deleteReturnedTicket', { id }, 'deleteReturnedTicket') }
export const GetSingleSession = (id) => { return FetchGet(`/singleSessionTicketCount/${id}`, 'singleSession') }