import store from "../store/session_store"

export const Session_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getAllSessionEvents':
            if (action.payload.success) {
                temp.events = action.payload.events
            }
            break;
        case 'getAllSessions':
            if (action.payload.success) {
                temp.sessions = action.payload.sessions
                temp.pageInfo = {
                    hasNextPage: action.payload.hasNextPage,
                    totalPages: action.payload.totalPages,
                    currentPage: action.payload.currentPage,
                }
            }
            break;
        case 'deleteSession':
            if (action.payload.success) {
                temp.update = new Date()
            }
            break;
        case 'singleSession':
            if (action.payload.success) {
                temp.session = action.payload.session
            }
            break;
        default:
            return temp;
    }
    return temp;
}