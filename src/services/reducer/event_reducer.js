import store from "../store/event_store"

export const Event_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'allEvents':
            if (action.payload.success) {
                temp.events = action.payload.events
            }
            break;
        default:
            return temp;
    }
    return temp;
}