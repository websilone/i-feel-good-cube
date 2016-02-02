import Immutable from 'immutable'
import createReducer from 'utils/createReducer'

import { GET_HEROES_REQUEST, GET_HEROES_SUCCESS } from 'constants/heroes'

const INITIAL_STATE = Immutable.Map()

export default createReducer(INITIAL_STATE, {
    [GET_HEROES_REQUEST] (state) {
        return state.merge({
            isLoading: true,
            error: null
        })
    },

    [GET_HEROES_SUCCESS] (state, { heroes }) {
        return state.merge({
            isLoading: false,
            haveBeenLoaded: true,
            error: null,
            heroes
        })
    }
})
