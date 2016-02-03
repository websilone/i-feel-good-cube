import Immutable from 'immutable'
import createReducer from 'utils/createReducer'

import { GET_TEAMS_REQUEST, GET_TEAMS_SUCCESS, GET_TEAMS_FAILURE, UPDATE_TEAMS } from 'constants/teams'

const INITIAL_STATE = Immutable.Map()

export default createReducer(INITIAL_STATE, {
    [GET_TEAMS_REQUEST] (state) {
        return state.merge({
            isLoading: true,
            error: null
        })
    },

    [GET_TEAMS_SUCCESS] (state, { teams }) {
        return state.merge({
            isLoading: false,
            haveBeenLoaded: true,
            error: null,
            teams
        })
    },

    [GET_TEAMS_FAILURE] (state, { error }) {
        return state.merge({
            isLoading: false,
            haveBeenLoaded: false,
            error
        })
    },

    [UPDATE_TEAMS] (state, { id, team }) {
        const t = state.get('teams').findEntry((obj) => {
                return obj.get('id') === id
            })

        return state.updateIn(['teams', t[0], 'stat'], val => team.stat)
    }
})
