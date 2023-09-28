import store from "../store/sponsor_store"

export const Sponsor_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getAllSponsors':
            if (action.payload.success) {
                temp.allSponsors = action.payload.sponsors
            }
            break;
        case 'update':
            if(action.payload.success) {
                temp.update = new Date()
            }
            break;
        default:
            return temp;
    }
    return temp;
}