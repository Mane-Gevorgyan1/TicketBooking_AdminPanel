import store from "../store/category_store"

export const Category_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getAllCategories':
            if (action.payload.success) {
                temp.categories = action.payload.categories
            }
            break;
        case 'createCategory':
            if(action.payload.success) {
                alert('Category Created')
            }
            break;
        default:
            return temp;
    }
    return temp;
}