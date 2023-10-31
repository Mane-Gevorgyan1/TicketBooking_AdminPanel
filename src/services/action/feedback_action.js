import { FetchGet } from "./fetchHelper"

export const GetFeedback = () => { return FetchGet(`/getFeedback`, 'getFeedback') }