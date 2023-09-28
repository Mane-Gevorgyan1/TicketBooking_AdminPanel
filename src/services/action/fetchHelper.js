// const token = localStorage.getItem('token')

export const FetchPost = (api, data, success, error) => {
    return (dispatch) => {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        // myHeaders.append('Authorization', `Bearer ${token}`) 
        fetch(`${process.env.REACT_APP_HOSTNAME}${api}`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => dispatch({
                type: success,
                payload: res
            }))
            .catch(err => {
                dispatch({
                    type: error,
                    payload: err
                })
            })
    }
}

export const FetchPatch = (api, data, success, error) => {
    return (dispatch) => {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        // myHeaders.append('Authorization', `Bearer ${token}`) 
        fetch(`${process.env.REACT_APP_HOSTNAME}${api}`, {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => dispatch({
                type: success,
                payload: res
            }))
            .catch(err => {
                dispatch({
                    type: error,
                    payload: err
                })
            })
    }
}

export const FetchDelete = (api, data, success, error) => {
    return (dispatch) => {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        // myHeaders.append('Authorization', `Bearer ${token}`) 
        fetch(`${process.env.REACT_APP_HOSTNAME}${api}`, {
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => dispatch({
                type: success,
                payload: res
            }))
            .catch(err => {
                dispatch({
                    type: error,
                    payload: err
                })
            })
    }
}

export const FetchGet = (api, success, error) => {
    return (dispatch) => {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        // myHeaders.append('Authorization', `Bearer ${token}`)
        fetch(`${process.env.REACT_APP_HOSTNAME}${api}`, {
            method: "GET",
            headers: myHeaders,
        })
            .then(response => response.json())
            .then(res => dispatch({
                type: success,
                payload: res
            }))
            .catch(err => {
                dispatch({
                    type: error,
                    payload: err
                })
            })
    }
}