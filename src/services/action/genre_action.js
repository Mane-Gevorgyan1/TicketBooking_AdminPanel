import { FetchGet, FetchPost } from "./fetchHelper"

export const GetAllGenres = () => { return FetchGet('/getAllGenres', 'getAllGenres') }
export const CreateNewGenre = (name) => { return FetchPost('/createGenre', { name }, 'createGenre') }