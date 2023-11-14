import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { CODE, OPEN_CELL, TableContext } from './BalloonSearch';
import balloonImg from './balloon_img.jpg';

const getTdContent = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return <div style={{
                width: '50px',
                height: '50px', 
                display: 'block', 
                margin: '0 auto',
            }}></div>;
        case CODE.BALLOON:
            return (<img src = {balloonImg}
                style={{
                    width: '50px',
                    height: '50px', 
                    display: 'block', 
                    margin: '0 auto',
                }}></img>);
        default:
            return ' ';
    }

};

const Td = ({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(()=>{
        if(halted){
            return;
        }
        dispatch({type:OPEN_CELL, row:rowIndex, cell: cellIndex});
    },[cellIndex, rowIndex, dispatch, halted]);
    
    return (
        <StyledTd>
            <td
                onClick={onClickTd}
            >{getTdContent(tableData[rowIndex][cellIndex])}
            </td>
        </StyledTd>
    )

}
const StyledTd = styled.td`
    color:  ${props => props.theme === 'light' ? '#31302E' : '#bbb'};
    border-top: ${props => props.theme.tdBorderColor};
    border-left: ${props => props.theme.tdBorderColor};
    border-right: ${props => props.theme.tdBorderColor};
    border-bottom: ${props => props.theme.tdBorderColor};
`;
export default Td;