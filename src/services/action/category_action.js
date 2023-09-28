import { FetchDelete, FetchGet, FetchPatch, FetchPost } from "./fetchHelper"

export const GetAllCategories = () => { return FetchGet('/getCategories', 'getAllCategories') }

export const CreateNewCategory = (name) => { return FetchPost('/createCategory', { name }, 'update') }
export const EditCategory = (id, name) => { return FetchPatch('/editCategory', { id, name }, 'update') }
export const DeleteCategory = (id) => { return FetchDelete('/deleteCategory', { id }, 'update') }

export const CreateSubcategory = (id, name) => { return FetchPost('/createSubcategory', { categoryId: id, name }, 'update') }
export const EditSubcategory = (id, name) => { return FetchPatch('/editSubcategory', { id, name }, 'update') }
export const DeleteSubcategory = (id) => { return FetchDelete('/deleteSubcategory', { id }, 'update') }

export const ResetNavigate = () => {
    return {
        type: 'resetNavigate'
    }
}