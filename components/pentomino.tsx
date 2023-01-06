import React, { useState } from "react"

const pentominoes = [

    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ]
]

function canPlacePentomino(playArea: number[][], pentomino: number[][], x: number, y: number) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (pentomino[i][j] === 1) {
                // Check that the pentomino fits within the bounds of the playArea
                if (i - 2 + x < 0 || i - 2 + x >= playArea.length || j - 2 + y < 0 || j - 2 + y >= playArea[0].length) {

                    console.log("doesnt fit area")
                    return false;
                }
                // Check that the pentomino does not overlap with any other pentominoes
                if (playArea[i - 2 + x][j - 2 + y] > 0) {
                    console.log("collides")
                    return false;
                }
            }
        }
    }
    return true;
}



export function Pentomino() {
    const [pentonimoUsed, setPentonimoUsed] = useState(pentominoes.map(x => false))
    const [playArea, setPlayArea] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ])
    const [displayArea, setDisplayArea] = useState([...playArea])
    const [selectedPentomino, setSelectedPentomino] = useState(0)
    function draggedOver(x: number, y: number) {
        setDisplayArea(playArea)

        console.log(x, y)
        if (canPlacePentomino(playArea, pentominoes[selectedPentomino], x, y)) {
            var area = playArea.map(x => [...x])
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (pentominoes[selectedPentomino][i][j] > 0)
                        area[i - 2 + x][j - 2 + y] = selectedPentomino + 1
                }
            }
            setDisplayArea(area)
        }
    }

    function placePentomino() {
        console.log("placing")
        setPlayArea(displayArea)
        setSelectedPentomino(0)
        pentonimoUsed[selectedPentomino] = true
        setPentonimoUsed([...pentonimoUsed])
    }

    function select(i: number) {
        if (!selectedPentomino) {
            setSelectedPentomino(i)
        }
    }

    return (
        <>
            <div id="grid" style={{ gridTemplateColumns: `repeat(${playArea[0].length}, 50px)`, gridTemplateRows: `repeat(${playArea.length}, 50px)` }}>
                {displayArea.map((row, rowIndex) => row.map((cell, i) => (
                    <div key={i} className={"block p" + cell} onDragOver={() => draggedOver(rowIndex, i)} ></div>
                )))}
            </div>

            <div className="toolbox">
                {pentominoes.map((pentomino, i) => (
                    <>
                        {!pentonimoUsed[i] && <div key={`p${i}`} className="pentomino" draggable="true" onDragEnter={() => select(i)} onDragEnd={() => placePentomino()}>
                            {pentomino.map((row, indexRow) => row.map((cell, cellColumn) => (
                                <>
                                    {!!cell &&
                                        <div
                                            className={"block p" + (i + 1)}
                                            style={{ gridRow: indexRow + 1, gridColumn: cellColumn + 1 }}
                                            key={`px${i};${indexRow};${cellColumn}`}>
                                        </div>
                                    }
                                </>
                            )))}
                        </div>}
                    </>

                ))}
            </div>


        </>
    )
}