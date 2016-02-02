import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { loadHeroes } from 'actions/heroes'
import HeroCard from 'components/HeroCard'
import Loader from 'components/Loader'

const styles = {
    title: {
        marginBottom: '2em'
    }
}

class List extends React.Component {
    static propTypes = {
        loadHeroes: PropTypes.func,
        isLoading: PropTypes.bool,
        heroes: ImmutablePropTypes.list
    };

    constructor (props) {
        super(props)
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentDidMount () {
        this.props.loadHeroes()
    }

    render () {
        const { isLoading } = this.props

        return (
            <div>
                <h1 style={ styles.title } className="ui center aligned header">Marvel's Super Heroes List</h1>
                {
                    isLoading
                        ? <Loader text="Loading heroes..." />
                        : this.renderHeroes()
                }
            </div>
        )
    }

    renderHeroes () {
        const { heroes } = this.props

        return <div className="ui container">
            <div className="ui three column grid">
                {
                    heroes.map((hero, index) => {
                        const picture = `${hero.getIn(['thumbnail', 'path'])}.${hero.getIn(['thumbnail', 'extension'])}`
                        const name = hero.get('name')
                        const links = hero.get('urls')
                        const id = hero.get('id')

                        return <HeroCard
                            key={ index }
                            id={ id }
                            name={ name }
                            picture={ picture }
                            links={ links }
                        />
                    })
                }
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.heroes.get('isLoading', true),
        heroes: state.heroes.get('heroes', Immutable.List())
    }
}

const ListContainer = connect(mapStateToProps, {
    loadHeroes
})(List)

export { List, ListContainer }
