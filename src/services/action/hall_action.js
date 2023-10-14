import { FetchGet } from "./fetchHelper"

export const GetAllHalls = () => { return FetchGet('/getAllHalls', 'getAllHalls') }
export const GetSingleHall = (id) => { return FetchGet(`/singleHall/${id}`, 'getSingleHall') }