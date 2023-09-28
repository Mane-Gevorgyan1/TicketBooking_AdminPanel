import { FetchDelete, FetchGet} from "./fetchHelper"

export const GetAllSponsors = () => {return FetchGet('/getAllSponsors', 'getAllSponsors')}
export const DeleteSponsor = (id) => {return FetchDelete('/deleteSponsor', {id}, 'update')}