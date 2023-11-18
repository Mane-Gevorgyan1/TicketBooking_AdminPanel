import store from '../store/ad_store'

export const Ad_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getAllAds':
            if (action.payload.success) {
                temp.ads = action.payload.ads
            }
            break;
        case 'getSingleAd':
            if (action.payload.success) {
                temp.ad = action.payload.ad
            }
            break;
        case 'deleteAd':
            if (action.payload.success) {
                temp.update = new Date()
            }
            break;
        default:
            return temp
    }
    return temp
}