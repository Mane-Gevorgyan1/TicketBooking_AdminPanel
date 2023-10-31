import store from '../store/feedback_store'

export const Feedback_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getFeedback':
            if(action.payload.success) {
                temp.feedback = action.payload.feedback
            }
            break;
        default:
            return temp;
    }
    return temp
}