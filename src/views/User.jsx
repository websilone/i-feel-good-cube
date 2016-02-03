import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Material UI
import CircularProgress from 'material-ui/lib/circular-progress'
import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'
import { Chart } from 'react-d3-shape'
import { LineTooltip } from 'react-d3-tooltip'
import SimpleTooltip from 'react-d3-tooltip/lib/tooltip/simple'
import { Xaxis } from 'react-d3-core'
import { Yaxis } from 'react-d3-core'
import * as Colors from 'material-ui/lib/styles/colors'

import { loadUser } from 'actions/user'
import moodConfig from 'utils/moodConfig'

const styles = {
    loader: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '1rem'
    },
    titlePaper : {
        marginTop: '1rem',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center'
    },
    titleText: {
        margin: 0,
        flexGrow: 1
    },
    titleMenu: {
        order: 1
    },
    avatar: {
        marginRight: '1rem',
        textTransform: 'uppercase'
    }
}

const margins = { left: 100, right: 100, top: 50, bottom: 50 }

const chartSeries = [
    {
        field: 'value',
        name: '',
        color: Colors.grey400,
        style: {
            'stroke-width': 2,
            'stroke-opacity': 1,
            'fill-opacity': 1
        }
    }
]

const x = (d) => {
    return d.index;
}

class User extends React.Component {
    static propTypes = {
        loadUser: React.PropTypes.func,
        user: ImmutablePropTypes.map
    };

    constructor (props) {
        super(props)
    }

    componentDidMount () {
        this.props.loadUser(this.props.params.userId, true)

        this.interval = setInterval(() => {
            this.props.loadUser(this.props.params.userId, false)
        }, 2000)
    }

    componentWillUnmount () {
        clearInterval(this.interval)
    }

    render () {
        const { user } = this.props
        const loading = user.get('isLoading', true)

        return <div>
            {
                loading
                    ? <div style={ styles.loader }><CircularProgress /><p>Loading user data</p></div>
                    : this.renderUser()
            }
        </div>
    }

    renderUser () {
        const { user } = this.props

        console.log(user.getIn(['user', 'historic'], Immutable.List()))

        const historic = user.getIn(['user', 'historic'], Immutable.List()).takeLast(30).toJS().map((entry, index) => {
            entry.index = index
            return entry
        })

        const lastEntry = user.getIn(['user', 'historic'], Immutable.List()).last() || Immutable.Map()
        chartSeries[0].color = moodConfig[lastEntry.get('value', -1)].color

        return <div>
            <Paper style={ styles.titlePaper } zDepth={ 1 }>
                <h2 style={ styles.titleText }>
                    <Avatar style={ styles.avatar } backgroundColor={ Colors.grey900 } size={ 40 }>{ user.getIn(['user', 'name'], '')[0] }</Avatar>
                    { user.getIn(['user', 'name']) }
                </h2>
            </Paper>

            <Paper style={ styles.titlePaper } zDepth={ 1 }>
                {
                    historic.length > 0
                        ? <LineTooltip
                            width= { 800 }
                            height= { 300 }
                            data= { historic }
                            chartSeries= { chartSeries }
                            x= {x}
                            margins={ margins }
                            showXGrid={ false }
                        >
                            <SimpleTooltip />
                        </LineTooltip>
                        : 'No data available'
                }

            </Paper>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const UserContainer = connect(mapStateToProps, {
    loadUser
})(User)

export { User, UserContainer }
