import store from "../store/ticket_store"

export const Ticket_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case '':
            break;
        default:
            return temp;
    }
    return temp;
}