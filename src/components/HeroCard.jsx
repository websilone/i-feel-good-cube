import React from 'react'
import { Link } from 'react-router'

const styles = {
    image: {
        height: '250px',
        backgroundSize: 'cover',
        backgroundPosition: '0 50%',
        backgroundRepeat: 'no-repeat'
    }
}

const HeroCard = ({ id, name, picture, links }) => (
    <div className="column">
        <div className="ui card">
            <Link to={ `/heroes/${id}` } className="image" style={ Object.assign({}, styles.image, { backgroundImage: `url(${picture})` }) } />
            <div className="content">
                <Link to={ `/heroes/${id}` } className="header">
                    { name }
                </Link>
            </div>
            <div className="extra content">
                { links.map((link, index) => {
                    return <a key={ index } href={ link.get('url') } className="ui label" target="_blank">
                        <i className="external icon"></i>{ link.get('type') }
                    </a>
                }) }
            </div>
        </div>
    </div>
)

export default HeroCard
