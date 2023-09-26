import { FetchGet } from "./fetchHelper"

export const GetAllSponsors = () => {return FetchGet('/getAllSponsors', 'getAllSponsors')}