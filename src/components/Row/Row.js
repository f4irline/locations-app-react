import React from 'react';
import Column from './Column/Column';

import './Row.css'

const Row = (props) => {

    let row = props.row;
    let cols = Object.keys(row).map((key) => {
        return <Column key={key} element={row[key]} />
    });

    return (
        <div className='Row'>
            {cols}
        </div>
    )
}

export default Row;