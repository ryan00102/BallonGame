import { faSkullCrossbones, faSmileWink, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import styled from 'styled-components';
import Form from './Form';
import ThemeToggle from './Styles/ThemeToggle';
import { useTheme } from './Styles/themeProvider';
import Table from './Table';


export const CODE = {
    BALLOON : -2,
    NORMAL : -1,
    CLICKED : 0,
    OPENED: 1
};

const plantBalloon = (row, cell, balloon) => {
    const data = [];
    const shuffle = [];
    // 난수 생성 후 셔플 리스트에 넣어주기
    let i = 0;
    while (i < balloon) {
        const chosen = Math.floor(Math.random() * (row*cell))
        if (shuffle.includes(chosen) === false) {
            shuffle.push(chosen);
            i++;
        }
    }
    
    // 데이타 맵을 전부 노멀로 초기화
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    // 가로 세로 계산해서 지뢰 심기
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.BALLOON;
    }
    
    return data;
}

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: true,
    isBegin: false,
    gameData: {
        row:0,
        cell:0,
        balloon:0,
    },
    isWin : false,
    isLose : false,
    isRestartVisible : false,
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            console.log(action.balloon);
            return {
                ...state,
                tableData: plantBalloon(action.row, action.cell, action.balloon),
                halted:false,
                isBegin: true,
                gameData:{
                    row:action.row,
                    cell:action.cell,
                    balloon:action.balloon
                },
                timer : 0,
                result : "",
                isWin: false,
                isLose : false,
                isRestartVisible: false,
            };
        case OPEN_CELL:{
            console.log("풍선" ,state.gameData.balloon);
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            
            let halted = false;
            let isBegin = true;
            let result = '';
            let isWin = false;
            let isRestartVisible = false;
            let isLose = false;
            

            if (state.tableData[action.row][action.cell] === CODE.BALLOON) {
                const connectedBalloons = findConnectedBalloons(tableData, action.row, action.cell);
                const largestGroup = findLargestConnectedGroup(tableData);
                
                tableData[action.row][action.cell] = CODE.OPENED;
                
                
                connectedBalloons.forEach(({ row, cell }) => {
                    tableData[row][cell] = CODE.OPENED;
                });
                const openedBalloons = findOpenedBalloons(tableData, action.row, action.cell);
                
            
                console.log('Largest Connected Group Size:', largestGroup.length);
                

                console.log('Clicked Balloon Group Size:', connectedBalloons.length);
                console.log('Opened Balloons : ',openedBalloons);
                

                if(connectedBalloons.length !== largestGroup.length){
                    halted = true;
                    isLose = true;
                    isRestartVisible = true;
                    result = "You lose.";
                }
                if(openedBalloons === state.gameData.balloon){
                    halted = true;
                    isWin = true;
                    isRestartVisible = true; 
                    result = `You won in ${state.timer} seconds!!`;
                }

            }
            return {
                ...state,
                tableData,
                halted,
                isBegin,
                result,
                isLose,
                isWin,
                isRestartVisible,
            }
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }

        case RESET_GAME:
            return {
                ...state,
                isRestartVisible: false, 
            };

        default: 
            return state;
    }
}

const findOpenedBalloons = (tableData, row, cell)=>{
    let openedBalloonCount = 0;
    tableData.forEach(row => {
        row.forEach(cell => {
            if (cell === CODE.OPENED) {
                openedBalloonCount++;
            }
        });
    });
    return openedBalloonCount;
}

const findConnectedBalloons = (tableData, row, cell) => {
    const visited = new Set();
    const connectedBalloons = [];

    const dfs = (r, c) => {
        if (r < 0 || r >= tableData.length || c < 0 || c >= tableData[0].length || visited.has(`${r},${c}`)) {
            return;
        }

        visited.add(`${r},${c}`);

        if (tableData[r][c] === -2) {
            connectedBalloons.push({ row: r, cell: c });
        } else {
            return;
        }

        dfs(r - 1, c);
        dfs(r + 1, c);
        dfs(r, c - 1);
        dfs(r, c + 1);
    };

    dfs(row, cell);

    return connectedBalloons;
};

const findLargestConnectedGroup = (tableData) => {
    const visited = new Set();
    let largestGroup = [];

    for (let i = 0; i < tableData.length; i++) {
        for (let j = 0; j < tableData[0].length; j++) {
            if (tableData[i][j] === -2 && !visited.has(`${i},${j}`)) {
                const connectedBalloons = findConnectedBalloons(tableData, i, j);
                if (connectedBalloons.length > largestGroup.length) {
                    largestGroup = connectedBalloons;
                }
            }
        }
    }

    return largestGroup;
};

const BalloonSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;
    const value = useMemo(() => ({ tableData: tableData, halted: halted, dispatch }), [tableData, halted]);
    const [ThemeMode, toggleTheme] = useTheme();
    useEffect(() => {
        let timer;
        if (!halted){
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    },[halted]);


    
      

    
    return (
        
        <TableContext.Provider value = {value}>  
            
            <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
                DarkMode
            </ThemeToggle>
            {state.isBegin?  <div></div>:<Form />}
            <div class="timer"><FontAwesomeIcon icon={faStopwatch} /> {timer}</div>
            <div className="center-container"><Table /></div>
            {!state.isBegin?<StyledDiv class="before-begin">{"격자 크기를 입력하시고, 시작 버튼을 누르세요."}</StyledDiv> : <div></div>}
            {state.isWin?<div class="result-win"> {result}<FontAwesomeIcon icon={faSmileWink} /> </div>:<div></div>}
            {state.isLose?<div class="result-lose"> {result}<FontAwesomeIcon icon={faSkullCrossbones} /></div>:<div></div>}
            
        </TableContext.Provider>
    )
}

const StyledDiv = styled.div`
    font-size : 30px;
    font-weight : bold;
    color:  ${props => props.theme.textColor};
`;


export default BalloonSearch;