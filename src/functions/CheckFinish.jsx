import { CODE } from "../Components/BalloonSearch";


export const findOpenedBalloons = (tableData, row, cell)=>{
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

export const findConnectedBalloons = (tableData, row, cell) => {
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

export const findLargestConnectedGroup = (tableData) => {
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
