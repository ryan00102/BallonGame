import React, { useContext } from 'react';
import { TableContext } from './BalloonSearch';
import Tr from './Tr';

const Table = () => {
    const { tableData } = useContext(TableContext);

    return (
            <table className="margin-table">
                {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
            </table>
        
    );

}


export default Table;