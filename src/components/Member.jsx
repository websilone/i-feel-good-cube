import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Material UI
import ListItem from 'material-ui/lib/lists/list-item'
import Notification from 'material-ui/lib/svg-icons/social/notifications-active'
import IconButton from 'material-ui/lib/icon-button'

import moodConfig from 'utils/moodConfig'

const styles = {
    mood: {
        fontSize: '1.5rem'
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
    memberDetails: {
        paddingLeft: '72px',
        paddingBottom: '10px',
        paddingTop: '10px',
        fontSize: '14px',
        borderBottom: '1px solid #ddd'
    }
}

class Member extends React.Component {
    static propTypes = {
        memberInfo: ImmutablePropTypes.map,
        wizzAction: React.PropTypes.func
    };

    constructor (props) {
        super(props)
    }

    handleWizz (id, name) {
        this.props.wizzAction(id, name)
    }

    render () {
        const { memberInfo } = this.props

        const mood = Math.round(memberInfo.get('stat'))

        return <div>
            <ListItem
                primaryText={ memberInfo.get('name') }
                secondaryText={ <LastUpdateTime date={ memberInfo.get('last_state', null) } /> }
                leftIcon={ <span className={ moodConfig[mood].icon } style={ Object.assign({}, styles.mood, { color: moodConfig[mood].color }) }></span> }
                rightIconButton={ <IconButton onTouchTap={ this.handleWizz.bind(this, memberInfo.get('id'), memberInfo.get('name')) }><Notification /></IconButton> }
            />

            <div style={ styles.memberDetails }>
                Some content text here
            </div>
        </div>
    }
}

class LastUpdateTime extends React.Component {
    static propTypes = {
        date: React.PropTypes.any
    };

    constructor (props) {
        super(props)
        this.forceUpdate = this.forceUpdate.bind(this)

        this.interval = setInterval(this.forceUpdate, 1000)
    }

    componentWillUnmount () {
        clearInterval(this.interval)
    }

    render () {
        const { date } = this.props

        return <div style={ styles.secondaryText }>
            { date ? `updated ${moment(date).fromNow()}` : 'N/A' }
        </div>
    }
}

export default Member

/* <Paper>
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
 </Paper>
*/
