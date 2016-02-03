import React from 'react'
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import capitalize from 'lodash/capitalize'

// Material Components
import * as Colors from 'material-ui/lib/styles/colors'
import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import RaisedButton from 'material-ui/lib/raised-button'
// import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import MenuItem from 'material-ui/lib/menus/menu-item'
// import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import Notification from 'material-ui/lib/svg-icons/social/notifications-active'
import Snackbar from 'material-ui/lib/snackbar'

// import LineChart from 'react-d3-basic/lib/line'
import { Line, Chart } from 'react-d3-shape'
import { Xaxis } from 'react-d3-core'

import { loadTeam, loadTeams, notify, cleanNotification } from 'actions/teams'
import Member from 'components/Member'
import moodConfig from 'utils/moodConfig'

// const Xaxis = require('react-d3-core').Xaxis

const styles = {
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
    },
    listPaper: {
        marginTop: '1rem'
    },
    mood: {
        fontSize: '1.5rem'
    },
    dashboardButton: {
        margin: 12
    },
    secondaryText: {
        fontSize: '14px',
        lineHeight: '16px',
        height: '16px',
        margin: 0,
        marginTop: '4px',
        color: 'rgba(0, 0, 0, 0.54)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    button: {
        margin: 12,
        float: 'right'
    }
}

const margins = { left: 100, right: 100, top: 50, bottom: 50 }
const chartData = [
    {
        name: 'Lavon Hilll I',
        BMI: 20.57,
        age: 12,
        birthday: '1994-10-26T00:00:00.000Z',
        city: 'Annatown',
        married: true,
        index: 1
    },
    {
        name: 'Clovis Pagac',
        BMI: 24.28,
        age: 26,
        birthday: '1995-11-10T00:00:00.000Z',
        city: 'South Eldredtown',
        married: false,
        index: 3
    },
    {
        name: 'Gaylord Paucek',
        BMI: 24.41,
        age: 30,
        birthday: '1975-06-12T00:00:00.000Z',
        city: 'Koeppchester',
        married: true,
        index: 5
    },
    {
        name: 'Ashlynn Kuhn MD',
        BMI: 23.77,
        age: 32,
        birthday: '1985-08-09T00:00:00.000Z',
        city: 'West Josiemouth',
        married: false,
        index: 6
    }
]

const chartSeries = [
    {
        field: 'age',
        name: 'Age',
        color: '#ff7f0e',
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

class Team extends React.Component {
    static propTypes = {
        params: React.PropTypes.shape({
            teamId: React.PropTypes.string.isRequired
        }),
        loadTeam: React.PropTypes.func,
        loadTeams: React.PropTypes.func,
        notify: React.PropTypes.func,
        cleanNotification: React.PropTypes.func,
        team: ImmutablePropTypes.map,
        teams: ImmutablePropTypes.list
    };

    constructor (props) {
        super(props)
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentDidMount () {
        this.props.loadTeam(this.props.params.teamId, true)
        this.props.loadTeams()

        /* this.interval = setInterval(() => {
            this.props.loadTeam(this.props.params.teamId, false)
        }, 2000) */
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.params.teamId !== this.props.params.teamId) {
            this.props.loadTeam(nextProps.params.teamId)
        }
    }

    handleTeamChange (e, index, value) {
        browserHistory.push(`/teams/${value}`)
    }

    handleNotify (id, name) {
        this.props.notify(id, name)
    }

    handleNotificationClose () {
        this.props.cleanNotification()
    }

    render () {
        const { isLoading } = this.props
        // const teamName = capitalize(teamId.replace('-', ' '))

        return <div>
            {
                isLoading
                    ? <Paper style={ styles.titlePaper } zDepth={ 1 }>Chargement en cours...</Paper>
                    : this.renderTeam()
            }

            { /* <Paper>
                <Chart
                    width= { 800 }
                    height= { 300 }
                    data= { chartData }
                    chartSeries= { chartSeries }
                    x= {x}
                    margins={ margins }
                >
                    <Line
                        chartSeries= { chartSeries }
                        x= {x}
                    />

                    <Xaxis/>
                </Chart>
            </Paper> */ }
        </div>
    }

    renderTeam () {
        const { team, teams, isLoadingTeams, notification, notify } = this.props

        return (
            <div>
                <Paper style={ styles.titlePaper } zDepth={ 1 }>
                    <h2 style={ styles.titleText }>
                        <Avatar style={ styles.avatar } backgroundColor={ Colors.grey900 } size={ 40 }>{ team.get('name')[0] }</Avatar>
                        { team.get('name') }
                    </h2>

                    {
                        isLoadingTeams
                            ? <span>Chargement des équipes...</span>
                            : <DropDownMenu maxHeight={ 300 } value={ team.get('id') } onChange={ this.handleTeamChange }>
                                {
                                    teams.map((otherTeam, index) => {
                                        return <MenuItem key={ index } value={ otherTeam.get('id') } primaryText={ otherTeam.get('name') } />
                                    })
                                }
                            </DropDownMenu>
                    }
                </Paper>

                <Paper style={ styles.listPaper }>
                    <RaisedButton
                        label="Wizz the team !"
                        labelPosition="after"
                        icon={ <Notification /> }
                        style={ styles.button }
                        onTouchTap={ this.handleNotify.bind(this, team.get('id'), team.get('name'))}
                    />

                    <List subheader="Team members">
                        {
                            team.get('people').map((member, index) => (
                                <Member key={ index } memberInfo={ member } wizzAction={ notify } />
                            ))
                        }
                    </List>
                </Paper>

                <Snackbar
                    open={ notification.get('open', false) }
                    message={ notification.get('message', '') }
                    autoHideDuration={ 3000 }
                    onRequestClose={ this.handleNotificationClose.bind(this) }
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.team.get('isLoading', true),
        isLoadingTeams: state.teams.get('isLoading', true),
        team: state.team.get('team', Immutable.Map()),
        teams: state.teams.get('teams', Immutable.List()),
        notification: state.notification
    }
}

const TeamContainer = connect(mapStateToProps, {
    loadTeam,
    loadTeams,
    notify,
    cleanNotification
})(Team)

export { Team, TeamContainer }

