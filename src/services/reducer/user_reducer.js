import store from '../store/user_store'

export const User_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'createUser':
            if(action.payload.success) {
                alert('Մոդերատորը ստեղծված է')
                window.location = '/all-moderators'
            }
            break;
        case 'getAllModerators':
            if (action.payload.success) {
                temp.moderators = action.payload.moderators
            }
            break;
        case 'changeModeratorSettings':
            if (action.payload.success) {
                temp.update = new Date()
            }
            break;
        case 'deleteUser':
            if (action.payload.success) {
                temp.update = new Date()
            }
            break;
        default:
            return temp;
    }
    return temp;
}