import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import DashList from 'components/DashList'

import { loadTeams } from 'actions/teams'

const styles = {
    root : {
        marginTop: '1rem'
    },
    error: {
        lineHeight: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorIcon: {
        height: '40px',
        width: '40px',
        marginRight: '.5rem'
    }
}

class Dashboard extends React.Component {
    static propTypes = {
        loadTeams: React.PropTypes.func,
        teams: ImmutablePropTypes.map
    };

    constructor (props) {
        super(props)
    }

    componentDidMount () {
        this.props.loadTeams()
    }

    render () {
        const { teams } = this.props

        return <div style={ styles.root }>
            <DashList toolbarTitle="Teams" list={ teams.get('teams', Immutable.List()) } loading={ teams.get('isLoading', true) } error={ teams.get('error', null) } />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.teams
    }
}

const DashboardContainer = connect(mapStateToProps, {
    loadTeams
})(Dashboard)

export { Dashboard, DashboardContainer }
