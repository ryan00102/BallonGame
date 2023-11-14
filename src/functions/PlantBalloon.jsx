import { CODE } from "../Components/BalloonSearch";

export const plantBalloon = (row, cell, balloon) => {
    const data = [];
    const shuffle = [];
    let i = 0;
    while (i < balloon) {
        const chosen = Math.floor(Math.random() * (row*cell))
        if (shuffle.includes(chosen) === false) {
            shuffle.push(chosen);
            i++;
        }
    }
    
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