import store from "../store/ticket_store"

export const Ticket_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getAllTickets':
            if (action.payload.success) {
                temp.tickets = action.payload
            }
            break;
        case 'searchTicket':
            if (action.payload.success) {
                temp.search = action.payload.ticket
            }
            break;
        case 'getSingleTicket':
            if (action.payload.success) {
                temp.singleTicket = action.payload.ticket
            }
            break;
        case 'returnTicket':
            if (action.payload.success) {
                alert('Տոմսը հասանելի է նորից գնման համար')
                window.location = '/all-tickets'
            }
            break;
        case 'getReturnedTickets':
            if (action.payload.success) {
                temp.returnedTickets = action.payload.tickets
            }
            break;
        case 'deleteReturnTicket':
            if (action.payload.success) {
                temp.update = new Date()
            }
            break;
        case 'resetTicket':
            temp.singleTicket = {}
            break;
        case 'getSoldTickets':
            if (action.payload.success) {
                temp.soldTickets = action.payload.result
                temp.soldTicketsDetails = {
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    hasNextPage: action.payload.hasNextPage
                }
            }
            break;
        case 'getSingleReturnedTicket':
            if (action.payload.success) {
                temp.singleReturnedTicket = action.payload.ticket
            }
            break;
        case 'deleteReturnedTicket':
            if (action.payload.success) {
                alert('Տոմսը հետ է վերադարձված')
                window.location = '/all-tickets'
            }
            break;
        case 'singleSession':
            if (action.payload.success) {
                temp.session = action.payload.ticket
            }
            break;
        default:
            return temp;
    }
    return temp;
}