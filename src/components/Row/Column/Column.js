import React from 'react';
import './Column.css'

const Column = (props) => {
    return (
        <div className='Column'>
            {props.element}
        </div>
    )
}

export default Column;