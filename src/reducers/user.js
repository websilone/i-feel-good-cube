import Immutable from 'immutable'
import createReducer from 'utils/createReducer'

import { GET_USER_REQUEST, GET_USER_SUCCESS } from 'constants/user'

const INITIAL_STATE = Immutable.Map()

export default createReducer(INITIAL_STATE, {
    [GET_USER_REQUEST] (state) {
        return state.merge({
            isLoading: true,
            error: null
        })
    },

    [GET_USER_SUCCESS] (state, { user }) {
        return state.merge({
            isLoading: false,
            error: null,
            user
        })
    }
})
