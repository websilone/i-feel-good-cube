import React from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { browserHistory } from 'react-router';

// Material UI Components
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import Avatar from 'material-ui/lib/avatar'
import IconButton from 'material-ui/lib/icon-button'
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right'
import * as Colors from 'material-ui/lib/styles/colors'
import CircularProgress from 'material-ui/lib/circular-progress'
import Paper from 'material-ui/lib/paper'
import AlertError from 'material-ui/lib/svg-icons/alert/error'

import moodConfig from 'utils/moodConfig'

const styles = {
    mood: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '152px',
        fontSize: '7rem'
    },
    list: {
        marginBottom: '.7rem'
    },
    toolbar: {
        display: 'flex',
        marginBottom: '.7rem'
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '1rem'
    }
}

class DashList extends React.Component {
    static propTypes = {
        toolbarTitle: React.PropTypes.string.isRequired,
        loading: React.PropTypes.bool.isRequired,
        list: ImmutablePropTypes.list,
        error: React.PropTypes.any
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor (props) {
        super(props)
    }

    handleTouchTap (p) {
        browserHistory.push(`/teams/${p}`)
    }

    render () {
        const { toolbarTitle, error } = this.props

        return <div>
            <Toolbar style={ styles.toolbar }>
                <ToolbarGroup>
                    <ToolbarTitle text={ toolbarTitle } />
                </ToolbarGroup>
            </Toolbar>

            {
                error
                    ? <Paper style={ styles.error } zDepth={ 1 }><AlertError style={ styles.errorIcon } color="red" />Erreur de chargement :-/</Paper>
                    : this.renderNoError()
            }
        </div>
    }

    renderNoError () {
        const { list, loading } = this.props

        return <div>
            {
                loading
                    ? <div style={ styles.loader }><CircularProgress /><p>Loading data</p></div>
                    : <GridList
                    cellHeight={ 200 }
                    padding={ 8 }
                    cols={ 3 }
                    style={ styles.list }
                >
                    { list.map((item, index) => (
                        <GridTile
                            key={ index }
                            title={ (<span><Avatar backgroundColor={ Colors.grey900 } size={ 30 }>{ item.get('name')[0] }</Avatar> { item.get('name') }</span>) }
                            actionIcon={ <IconButton onTouchTap={ this.handleTouchTap.bind(this, item.get('id')) }><ChevronRight color="white"/></IconButton> }
                            style={ {
                                backgroundColor: moodConfig[item.get('stat')].color,
                                color: moodConfig[item.get('stat')].text
                            } }
                        >
                            <span className={ moodConfig[item.get('stat')].icon } style={ styles.mood }></span>
                        </GridTile>
                    )) }
                </GridList>
            }
        </div>
    }
}

export default DashList
