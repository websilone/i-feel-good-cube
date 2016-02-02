import { combineReducers } from 'redux'
import teams from './teams'
import team from './team'
import notification from './notification'

export default combineReducers({
    teams,
    team,
    notification
});
