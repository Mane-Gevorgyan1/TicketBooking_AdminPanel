import store from "../store/category_store"

export const Category_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getAllCategories':
            if (action.payload.success) {
                temp.allCategories = action.payload.categories
            }
            break;
        case 'update':
            if (action.payload.success) {
                temp.update = new Date()
                temp.navigate = true
            }
            break;
        case 'resetNavigate':
            temp.navigate = false;
            break;
        default:
            return temp;
    }
    return temp;
}