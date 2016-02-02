import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router';

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

    handleBackAction () {
        browserHistory.push('/dashboard')
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

export default Layout
