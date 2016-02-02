import Immutable from 'immutable'
import createReducer from 'utils/createReducer'

import { GET_TEAM_REQUEST, GET_TEAM_SUCCESS } from 'constants/team'

const INITIAL_STATE = Immutable.Map()

export default createReducer(INITIAL_STATE, {
    [GET_TEAM_REQUEST] (state) {
        return state.merge({
            isLoading: true,
            error: null
        })
    },

    [GET_TEAM_SUCCESS] (state, { team }) {
        return state.merge({
            isLoading: false,
            error: null,
            team
        })
    }
})
