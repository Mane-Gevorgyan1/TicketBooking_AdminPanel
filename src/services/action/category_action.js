import { FetchDelete, FetchGet, FetchPatch, FetchPost } from "./fetchHelper"

export const GetAllCategories = () => { return FetchGet('/getCategories', 'getAllCategories') }

export const CreateNewCategory = (name, name_en, name_ru) => { return FetchPost('/createCategory', { name, name_en, name_ru }, 'update') }
export const EditCategory = (id, name, name_en, name_ru) => { return FetchPatch('/editCategory', { id, name, name_en, name_ru }, 'update') }
export const DeleteCategory = (id) => { return FetchDelete('/deleteCategory', { id }, 'update') }

export const CreateSubcategory = (id, name, name_en, name_ru) => { return FetchPost('/createSubcategory', { categoryId: id, name, name_en, name_ru }, 'update') }
export const EditSubcategory = (id, name, name_en, name_ru) => { return FetchPatch('/editSubcategory', { id, name, name_en, name_ru }, 'update') }
export const DeleteSubcategory = (id) => { return FetchDelete('/deleteSubcategory', { id }, 'update') }

export const ResetNavigate = () => {
    return {
        type: 'resetNavigate'
    }
}
