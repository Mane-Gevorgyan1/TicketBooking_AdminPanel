import { FetchGet, FetchPost } from "./fetchHelper"

export const SignIn = (username, password) => { return FetchPost('/login', { username, password }, 'login', 'loginError') }
export const GetUser = () => { return FetchGet('/getSingleUser', 'getUser') }