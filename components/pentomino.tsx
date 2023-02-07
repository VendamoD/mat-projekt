import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    LinkBox,
    HStack,
    Tooltip,
} from "@chakra-ui/react";
import NextLink from "next/link"
import React, { useEffect, useState } from "react"
import { useUserContext } from './userContext'

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

function rotatePentomino(pentomino: number[][]): number[][] {
    const n = pentomino.length;
    for (let i = 0; i < n / 2; i++) {
        for (let j = i; j < n - i - 1; j++) {
            const temp = pentomino[i][j];
            pentomino[i][j] = pentomino[n - j - 1][i];
            pentomino[n - j - 1][i] = pentomino[n - i - 1][n - j - 1];
            pentomino[n - i - 1][n - j - 1] = pentomino[j][n - i - 1];
            pentomino[j][n - i - 1] = temp;
        }
    }
    return pentomino;
}


export function Pentomino() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [pentominoes, setPentominoes] = useState([
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
            [0, 0, 0, 0, 0]
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
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0]
        ]
    ])
    function keyDown(e: React.KeyboardEvent<HTMLDivElement>, index: number) {
        if (e.key == "r") {
            setPentominoes([...pentominoes.slice(0, index), rotatePentomino(pentominoes[index]), ...pentominoes.slice(index + 1)])
        }
        if (e.key == "f") {
            setPentominoes([...pentominoes.slice(0, index), flip(pentominoes[index]), ...pentominoes.slice(index + 1)])
        }
    }
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
    const { updatePentomino } = useUserContext()

    function checkGame(playArea: number[][]) {
        var found = false
        for (let i = 0; i < playArea.length; i++) {
            for (let j = 0; j < playArea[i].length; j++) {
                if (playArea[i][j] == 0) {
                    found = true
                }
            }
        }
        if (!found) {
            console.log("Game won")
            updatePentomino()
            onOpen()
        }
    }

    function flip(pentomino: number[][]) {
        pentomino.reverse()
        return pentomino
    }

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

    function draggedEnter(x: number, y: number) {
        if (canPlacePentomino(playArea, pentominoes[selectedPentomino], x, y)) {
            draggedOver(x, y)
        }
    }
    function reset() {
        setPlayArea(
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]
        )
        setDisplayArea([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])
        setPentominoes([
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
                [0, 0, 0, 0, 0]
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
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0]
            ],
            [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0]
            ]
        ])
        setPentonimoUsed(pentominoes.map(x => false))
    }

    useEffect(() => {
        console.table(playArea)
        checkGame(playArea)
    }, [playArea])

    function movePentomino(rowindex: number, i: number) {
        if (selectedPentomino != 0) return;
        const value = playArea[rowindex] [i];
        if (value <= 0) return;
        if (canPlacePentomino(playArea, pentominoes[selectedPentomino], rowindex, i)) {
            draggedOver(rowindex, i)
        }
        select(value - 1)
        const newPlayarea = playArea.map(x => x.map(y => y == value ? 0 : y));
        setPlayArea(newPlayarea);
        setDisplayArea(newPlayarea);
    }

    function placePentomino(x: number, y: number) {
        console.log("drop")
        if (canPlacePentomino(playArea, pentominoes[selectedPentomino], x, y)) {
            console.log("dropped")
            setSelectedPentomino(0)
            console.log("placing")
            setPlayArea(displayArea)
            pentonimoUsed[selectedPentomino] = true
            setPentonimoUsed([...pentonimoUsed])
        }
    }

    function select(i: number) {
        if (!selectedPentomino) {
            setSelectedPentomino(i)
        }
    }

    return (
        <>
            <Tooltip maxW="lm" label="Pomocí kláves R a F otáčej dílky a potom je přetáhni do hracího pole. Tvým úkolem je poskládat do pole všechny díky tak, aby ti žádný nezůstal." borderWidth='1px' borderRadius='lg'>
                <Box marginLeft="50%" width="75px" borderRadius="1px" marginTop="10px" backgroundColor="#EDF2F7" text-align="center"> Jak hrát    <QuestionOutlineIcon /></Box>
            </Tooltip>

            <Box padding={5} paddingLeft="400px" id="grid" style={{ gridTemplateColumns: `repeat(${playArea[0].length}, 50px)`, gridTemplateRows: `repeat(${playArea.length}, 50px)` }}>
                {displayArea.map((row, rowIndex) => row.map((cell, i) => (
                    <div key={i} draggable="true" onDragStart={() => movePentomino(rowIndex, i)} className={"block p" + cell} onDrop={() => placePentomino(rowIndex, i)} onDragEnter={() => draggedEnter(rowIndex, i)} onDragOver={e => e.preventDefault()} ></div>
                )))}
            </Box>

            <Box paddingLeft="150px" className="toolbox">
                {pentominoes.map((pentomino, i) => (
                    <>
                        {!pentonimoUsed[i] &&
                            <div key={`p${i}`}
                                className="pentomino"
                                draggable="true"
                                tabIndex={i} onMouseEnter={e => e.currentTarget.focus()} onKeyDown={e => keyDown(e, i)}
                                onDragStart={() => select(i)}>
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
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Gratuluji. Úspěšně jsi dokončil hlavolam.</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Chceš pokračovat?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >
                            <LinkBox as={NextLink} href="./Home">
                                NE
                            </LinkBox>
                        </Button>
                        <Button variant='ghost' onClick={onClose}>ANO</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <HStack paddingLeft={"50%"} paddingTop="10px">
                <Button  onClick={() => reset()}>restart</Button>
            </HStack>
        </>
    )
}