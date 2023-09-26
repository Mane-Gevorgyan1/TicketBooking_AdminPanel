import store from "../store/genre_store"

export const Genre_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getAllGenres':
            if (action.payload.success) {
                temp.allGenres = action.payload.genres
            }
            break;
        case 'createGenre':
            console.log(action.payload);
            if(action.payload.success) {
            }
            break;
        default:
            return temp;
    }
    return temp;
}