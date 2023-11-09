import { FetchDelete, FetchGet, FetchPatch, FetchPost } from "./fetchHelper"

export const CreateUser = (data) => {return FetchPost('/createUser', data, 'createUser')}
export const GetAllModerators = () => { return FetchGet('/getAllUsers', 'getAllModerators') }
export const ChangeModeratorSettings = (data) => { return FetchPatch('/changeUserSettings', data, 'changeModeratorSettings', 'changeModeratorSettingsError') }
export const DeleteModerator = (id) => { return FetchDelete('/deleteUser', { id }, 'deleteUser') }
export const Logout = () => {return FetchPost('/logout', {accessToken: localStorage.getItem('accessToken')}, 'logout')}