import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'

import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import NavigationBack from 'material-ui/lib/svg-icons/navigation/arrow-back'
import ActionHome from 'material-ui/lib/svg-icons/action/home'

/* const styles = {
    container : {
        marginTop: '3em'
    }
} */

class Layout extends React.Component {
    static propTypes = {
        children: PropTypes.element
    };

    constructor (props) {
        super(props)
        this.handleBackAction = this.handleBackAction.bind(this)
    }

    handleBackAction () {
        const { location, teamId } = this.props

        if (location.pathname.indexOf('/teams') > -1){
            browserHistory.push('/dashboard')
        }
        else {
            browserHistory.push(`/teams/${teamId}`)
        }
    }

    render () {
        const { children, location } = this.props

        const appProps = location.pathname === '/dashboard'
            ? { iconElementLeft : <IconButton><ActionHome /></IconButton> }
            : { iconElementLeft : <IconButton onTouchTap={ this.handleBackAction }><NavigationBack /></IconButton> }

        return <div className="Layout">
            <AppBar
                title="I Feel Good Cube"
                { ...appProps }
            />
            { children }
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        teamId: state.user.getIn(['user', 'team_id'], 0)
    }
}

const LayoutContainer = connect(mapStateToProps)(Layout)

export { Layout, LayoutContainer }
