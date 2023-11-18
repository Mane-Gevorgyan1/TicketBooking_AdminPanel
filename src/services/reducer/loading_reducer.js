import store from '../store/loading_store'

export const Loading_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'startLoading':
            temp.loading = true
            break
        case 'StopLoading':
            temp.loading = false
            break
        default: return temp
    }
    return temp
}