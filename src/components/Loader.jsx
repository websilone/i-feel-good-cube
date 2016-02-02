import React from 'react'

const Loader = ({ text }) => (
    <div className="ui center segment">
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="ui active inverted dimmer">
            <div className="ui text loader">{ text }</div>
        </div>
    </div>
)

export default Loader
