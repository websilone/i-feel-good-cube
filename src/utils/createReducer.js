import Immutable, { Map, List } from 'immutable'

const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        // Enforce state to be immutable
        if (!Map.isMap(state) && !List.isList(state)) {
            state = Immutable.fromJS(state)
        }

        const handler = (action && action.type) ? handlers[action.type] : undefined

        // if no action was provided, return the actual state
        if (!handler) {
            return state
        }

        state = handler(state, action)

        if (!Map.isMap(state) && !List.isList(state)) {
            throw new TypeError('Reducers must return Immutable objects.')
        }

        return state
    }
}

export default createReducer
