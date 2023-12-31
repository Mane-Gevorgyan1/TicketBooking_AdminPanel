import store from "../store/event_store"

export const Event_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'allEvents':
            if (action.payload.success) {
                temp.events = action.payload.events
                temp.pageInfo = {
                    hasNextPage: action.payload.hasNextPage,
                    totalPages: action.payload.totalPages,
                    currentPage: action.payload.currentPage,
                }
            }
            break;
        case 'singleEvent':
            if (action.payload.success) {
                temp.event = action.payload.event
            }
            break;
        case 'update':
            if (action.payload.success) {
                temp.update = new Date()
            }
            break;
        case 'resetEvent':
            temp.event = {}
            break;
        default:
            return temp;
    }
    return temp;
}