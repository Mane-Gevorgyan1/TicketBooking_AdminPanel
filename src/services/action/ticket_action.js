import { FetchGet, FetchPost } from "./fetchHelper"

export const GetSeat = () => { return FetchGet(`/getSeats`, 'getSeat', 'getSeatError') }
export const Checkout = () => {return FetchPost('/create-checkout-session', {}, 'checkoutSuccess', 'checkoutError')}