import { combineReducers } from 'redux'
import { Ticket_reducer } from './ticket_reducer'
import { Event_reducer } from './event_reducer'
import { Genre_reducer } from './genre_reducer'

export default combineReducers({
    Ticket_reducer,
    Event_reducer,
    Genre_reducer,
})
