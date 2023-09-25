import store from "../store/event_store"

export const Event_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'allEvents':
            if (action.payload.success) {
                temp.events = action.payload.events
            }
            break;
        case 'singleEvent':
            if (action.payload.success) {
                temp.event = action.payload.event
            }
            break;
        case 'getAllCategories':
            console.log(action.payload.categories)
            if (action.payload.success) {
                let categories = []
                action.payload.categories.forEach(element => {
                    categories.push({ label: element?.name, value: element?.name })
                })
                temp.categories = categories
            }
            break;
        default:
            return temp;
    }
    return temp;
}