import reducers from '../reducers'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

export default function configureStore (initialState = {}) {
    /* const middleware = process.env.NODE_ENV === 'production'
        ? [ thunk ]
        : [ thunk, logger() ]; */

    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
    const store = createStoreWithMiddleware(reducers, initialState)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers/index')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
