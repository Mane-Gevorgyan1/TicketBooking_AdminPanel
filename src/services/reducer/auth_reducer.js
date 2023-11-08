import store from '../store/auth_store'

export const Auth_reducer = (state = store, action) => {
    let temp = { ...state }

    // eslint-disable-next-line
    function setCookie(cookieName, cookieValue, daysToExpire) {
        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/";
    }

    switch (action.type) {
        case 'login':
            if (action.payload.success) {
                temp.error = ''
                localStorage.setItem('accessToken', action.payload.accessToken)
                window.location = '/'
                // setCookie('refreshToken', action.payload.refreshToken, 7)
            } else {
                if (action.payload.message?.includes('User not found')) {
                    temp.error = 'Wrong username'
                } else if (action.payload.message?.includes('Wrong password')) {
                    temp.error = 'Wrong password'
                }
            }
            break;
        case 'getUser':
            if (action.payload.success) {
                temp.user = action.payload.user
            }
            break;
        default:
            return temp;
    }
    return temp
}