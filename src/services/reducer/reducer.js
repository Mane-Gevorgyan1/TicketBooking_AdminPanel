import { combineReducers } from 'redux'
import { Ticket_reducer } from './ticket_reducer'
import { Event_reducer } from './event_reducer'
import { Genre_reducer } from './genre_reducer'
import { Sponsor_reducer } from './sponsor_reducer'
import { Category_reducer } from './category_reducer'

export default combineReducers({
    Ticket_reducer,
    Event_reducer,
    Genre_reducer,
    Sponsor_reducer,
    Category_reducer,
})
