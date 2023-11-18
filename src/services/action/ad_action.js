const { FetchGet, FetchDelete } = require("./fetchHelper")

export const GetAllAds = () => {return FetchGet('/getAllAds', 'getAllAds')}
export const GetSingleAd = (id) => {return FetchGet(`/getSingleAd/${id}`, 'getSingleAd')}
export const DeleteAd = (id) => {return FetchDelete(`/deleteAd/${id}`, {}, 'deleteAd')}