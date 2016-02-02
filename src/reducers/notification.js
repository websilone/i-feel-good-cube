import Immutable from 'immutable'
import createReducer from 'utils/createReducer'

import { NOTIFICATION_REQUEST, NOTIFICATION_SUCCESS, NOTIFICATION_CLEAN } from 'constants/notification'

const INITIAL_STATE = Immutable.Map()

export default createReducer(INITIAL_STATE, {
    [NOTIFICATION_REQUEST] (state, { name }) {
        return state.merge({
            open: true,
            name,
            message: `Sending wizz to ${name}`,
            error: null
        })
    },

    [NOTIFICATION_SUCCESS] (state) {
        return state.merge({
            open: true,
            message: `Wizz sent to ${state.get('name')}`,
            error: null
        })
    },

    [NOTIFICATION_CLEAN] (state) {
        return state.merge({
            open: false,
            message: '',
            error: null
        })
    }
})
