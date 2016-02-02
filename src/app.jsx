import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

require('moment')

import getRoutes from './routes'

const store = configureStore()

require('./less/Main.less')

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory }>{ getRoutes(store) }</Router>
    </Provider>,
    document.getElementById('App')
);
