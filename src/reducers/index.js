import { combineReducers } from 'redux'
import teams from './teams'
import team from './team'
import notification from './notification'
import user from './user'

export default combineReducers({
    teams,
    team,
    user,
    notification
});
