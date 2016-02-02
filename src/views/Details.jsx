import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'

import { loadHero } from 'actions/heroes'
import HeroDetails from 'components/HeroDetails'
import Loader from 'components/Loader'

class Details extends React.Component {
    static propTypes = {
        loadHero: PropTypes.func,
        isLoading: PropTypes.bool,
        hero: ImmutablePropTypes.map,
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    };

    constructor (props) {
        super(props)
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentDidMount () {
        window.scrollTo(0, 0);
        this.props.loadHero(this.props.params.id)
    }

    render () {
        const { isLoading, hero } = this.props

        return (
            <div className="ui container">
                <div className="ui segment">
                    <Link to="/heroes" className="ui labeled icon button">
                        <i className="left arrow icon"></i>
                        Back to Heroes' List
                    </Link>
                </div>

                {
                    isLoading
                        ? <Loader text="Loading hero detail..." />
                        : <HeroDetails hero={ hero } />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.hero.get('isLoading', true),
        hero: state.hero.get('hero', Immutable.Map())
    }
}

const DetailsContainer = connect(mapStateToProps, {
    loadHero
})(Details)

export { Details, DetailsContainer }
