import React from 'react'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

import ItemsList from 'components/ItemsList'

const styles = {
    title: {
        marginBottom: '1em'
    }
}

class HeroDetails extends React.Component {
    constructor (props) {
        super(props)
    }

    static propTypes = {
        hero: ImmutablePropTypes.map
    };

    render () {
        const { hero } = this.props

        const picture = `${hero.getIn(['thumbnail', 'path'])}.${hero.getIn(['thumbnail', 'extension'])}`
        const name = hero.get('name')
        const description = hero.get('description', '')
        const comicsList = hero.getIn(['comics', 'items'], Immutable.List())
        const seriesList = hero.getIn(['series', 'items'], Immutable.List())

        return <div className="ui grid">
            <div className="six wide column">
                <img className="ui large rounded image" src={ picture } alt={ name } />
            </div>

            <div className="ten wide column">
                <div className="ui segment">
                    <h1 style={ description !== '' ? styles.title : { marginBottom: 0 } } className="ui header">{ name }</h1>

                    {
                        description !== ''
                            ? <p>{ description }</p>
                            : ''
                    }
                </div>

                { comicsList.size > 0 && <ItemsList title="Comics" list={ comicsList } /> }
                { seriesList.size > 0 && <ItemsList title="Series" list={ seriesList } /> }
            </div>
        </div>
    }
}

export default HeroDetails
