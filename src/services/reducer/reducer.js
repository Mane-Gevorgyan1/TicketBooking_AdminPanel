import { combineReducers } from 'redux'
import { Ticket_reducer } from './ticket_reducer'
import { Event_reducer } from './event_reducer'
import { Sponsor_reducer } from './sponsor_reducer'
import { Category_reducer } from './category_reducer'
import { Hall_reducer } from './hall_reducer'
import { Session_reducer } from './session_reducer'
import { Ad_reducer } from './ad_reducer'
import { Feedback_reducer } from './feedback_reducer'
import { Auth_reducer } from './auth_reducer'
import { User_reducer } from './user_reducer'

export default combineReducers({
    Ticket_reducer,
    Event_reducer,
    Sponsor_reducer,
    Category_reducer,
    Hall_reducer,
    Session_reducer,
    Ad_reducer,
    Feedback_reducer,
    Auth_reducer,
    User_reducer,
})
