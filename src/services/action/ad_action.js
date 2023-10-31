const { FetchGet } = require("./fetchHelper")

export const GetAllAds = () => {return FetchGet('/getAllAds', 'getAllAds')}
export const GetSingleAd = (id) => {return FetchGet(`/getSingleAd/${id}`, 'getSingleAd')}