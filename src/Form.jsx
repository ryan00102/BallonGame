import React, { memo, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { START_GAME, TableContext } from './BalloonSearch';

const Form = memo(() => {
    const [row, setRow] = useState(10); // 줄(세로)
    const [cell, setCell] = useState(10); // 칸(가로)
    const [balloon, setBalloon] = useState(20); // 지뢰 개수
    const { dispatch }= useContext(TableContext);

    // useCallback으로 감싸주면 불필요한 렌더링 막아줌
    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, []);

    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    }, []);

    const onChangeBalloon = useCallback((e) => {
        setBalloon(e.target.value);
    }, []);

    const onClickBtn = useCallback(() => {
        dispatch({ type: START_GAME, row, cell, balloon});
    }, [dispatch, row, cell, balloon]);

    return (
        <div class = "set-option">
            <StyledInput type="number" placeholder="세로" value={row} onChange={onChangeRow} />
            <StyledInput type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
            <StyledInput type="number" placeholder="풍선" value={balloon} onChange={onChangeBalloon} />
            <StyledButton onClick={onClickBtn}>시작</StyledButton>
        </div>
    )
});

const StyledInput = styled.input`
    background: ${props => props.theme === 'light' ? '#31302E': '#ffffff'};
    color: black;
    text-align: center;
    width: 9%;
    height: 30px;
    font-size: 22px;
    margin-right: 22px;
`;
const StyledButton = styled.button`
    width: 10%;
    font-size: 20px;
    font-weight: bold;
    border: ${props => props.theme.buttonBorderColor};
    color: ${props => props.theme.buttonBgColor};
    background-color: #ffffff;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
`;

export default Form;