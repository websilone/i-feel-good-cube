import React from 'react'

const ItemsList = ({ title, list }) => (
    <div className="ui segment">
        <h3 className="ui header">{ title }</h3>

        <div className="ui divided list">
            {
                list.map((item, index) => (
                    <div key={ index } className="item">
                        { item.get('name') }
                    </div>
                ))
            }
        </div>
    </div>
)

export default ItemsList
