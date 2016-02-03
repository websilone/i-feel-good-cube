import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
// import io from 'socket.io-client'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

require('moment')

import getRoutes from './routes'
import { GET_TEAM_SUCCESS } from 'constants/team'
import { UPDATE_TEAMS } from 'constants/teams'

const store = configureStore()

require('./less/Main.less')

const ws = new WebSocket("ws://10.1.3.159:4567")

ws.onmessage = (evt) => {
    let data

    try {
        data = JSON.parse(evt.data)

        if (data.type === 'team_msg') {
            const currentTeamId = store.getState().team.getIn(['team', 'id'])

            if (currentTeamId === data.payload.id) {
                store.dispatch({
                    type: GET_TEAM_SUCCESS,
                    team: data.payload
                })
            }

            store.dispatch({
                type: UPDATE_TEAMS,
                id: data.payload.id,
                team: data.payload
            })
        }
    }
    catch (e) {

    }
}

/* socket.on('state', state =>
    store.dispatch({
        type: 'WEBSOCKET',
        data: 'Youpi'
    })
) */

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory }>{ getRoutes(store) }</Router>
    </Provider>,
    document.getElementById('App')
);
