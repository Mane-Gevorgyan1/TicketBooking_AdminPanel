import { FetchGet, FetchPost } from "./fetchHelper"

export const GetAllCategories = () => {return FetchGet('/getCategories', 'getAllCategories')}
export const CreateNewCategory = (name) => {return FetchPost('/createCategory', {name}, 'createCategory')}