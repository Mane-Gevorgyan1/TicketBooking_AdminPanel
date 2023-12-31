import { FetchDelete, FetchGet } from "./fetchHelper"

export const GetAllSessionEvents = () => { return FetchGet('/getAllSessionEvents', 'getAllSessionEvents') }
export const GetAllSessions = (currentPage) => { return FetchGet(`/getAllSessions?currentPage=${currentPage}`, 'getAllSessions') }
export const DeleteSession = (id) => { return FetchDelete('/deleteSession', { id }, 'deleteSession') }
export const GetSingleSession = (id) => { return FetchGet(`/singleSession/${id}`, 'singleSession') }