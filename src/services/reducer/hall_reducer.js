import store from "../store/hall_store"

export const Hall_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getAllHalls':
            if (action.payload.success) {
                temp.halls = action.payload.halls
            }
            break;
        case 'getSingleHall':
            if (action.payload.success) {
                temp.hall = action.payload.hall
            }
            break;
        default:
            return temp;
    }
    return temp;
}