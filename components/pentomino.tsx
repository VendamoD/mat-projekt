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
    useDisclosure,
    LinkBox,
    HStack,
    Tooltip,
    Center,
    Grid,
} from "@chakra-ui/react";
import NextLink from "next/link"
import React, { useEffect, useState } from "react"
import allPentominos, { canPlacePentomino, emptyPlayarea, rotatePentomino } from "../lib/pentominos";
import { useUserContext } from './userContext'

export function Pentomino() {
    const modal = useDisclosure()

    const [pentominoes, setPentominoes] = useState(allPentominos);
    const [pentonimoUsed, setPentonimoUsed] = useState(pentominoes.map(x => false))
    const [playArea, setPlayArea] = useState(emptyPlayarea);
    const [displayArea, setDisplayArea] = useState([...playArea])
    const [selectedPentomino, setSelectedPentomino] = useState(0)
    const [[x, y], setOver] = useState([-1, -1]);

    const { updatePentomino } = useUserContext()
    //funkce pro kontrolu stavu hry, projdeme všechny hodnoty v poli playArea a pokud jsou všechny větší než 0, tak hrář splnil hlavolam
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
            updatePentomino()
            modal.onOpen()
        }
    }
    //podle toho jakou klávesu uživatel zmáčkl otočíme nebo překlopíme dílek
    function keyDown(e: React.KeyboardEvent<HTMLDivElement>, index: number) {
        if (e.key == "r") {
            setPentominoes([...pentominoes.slice(0, index), rotatePentomino(pentominoes[index]), ...pentominoes.slice(index + 1)])
        }
        if (e.key == "f") {
            setPentominoes([...pentominoes.slice(0, index), flip(pentominoes[index]), ...pentominoes.slice(index + 1)])
        }
    }

    //překlopíme dílek
    function flip(pentomino: number[][]) {
        pentomino.reverse()
        return pentomino
    }

    function reset() {
        setPlayArea([...emptyPlayarea])
        setDisplayArea([...emptyPlayarea])
        setPentominoes([...allPentominos])
        setPentonimoUsed(allPentominos.map(x => false))
        setOver([-1, -1])
        setSelectedPentomino(0)
    }
    //při každé změně playArea zkontrolujeme jestli hráč nevyřešil hlavolam
    useEffect(() => {
        checkGame(playArea)
    }, [playArea])
    //funkce pro položení pentomina
    function applyPentomino(area: number[][], pentomino: number[][], value: number) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (pentomino[i][j] > 0)
                    area[i - 2 + x][j - 2 + y] = value
            }
        }
        return area;
    }
    //funkce, která kontroluje jestli se dílek podle souřadnic vejde do pole a jestli má pentomino hodnotu 1
    function tryPlacePentomino(real: boolean) {
        if (real) setSelectedPentomino(0);
        if (x < 0) return;
        if (y < 0) return;
        if (selectedPentomino < 1) return;

        const pentomino = pentominoes[selectedPentomino - 1];
        //pokud můžu položit pentomino, tak ho položíme do pole
        if (canPlacePentomino(playArea, pentomino, x, y)) {
            var area = applyPentomino(playArea.map(x => [...x]), pentomino, selectedPentomino);

            if (real) {
                setPlayArea(area)
                pentonimoUsed[selectedPentomino - 1] = true
                setPentonimoUsed([...pentonimoUsed])
                setOver([-1, -1]);
            }
            setDisplayArea(area)
        }
    }
    //funkce která přesunuje pentomino z jedné už položené pozice na jinou
    function movePentomino(x: number, y: number, pentominoValue: number) {
        if (pentominoValue <= 0) return;
        if (selectedPentomino > 0) return;
        setSelectedPentomino(pentominoValue)

        const newPlayarea = playArea.map(x => x.map(y => y == pentominoValue ? 0 : y));
        setPlayArea(newPlayarea);
        setDisplayArea(newPlayarea);

        pentonimoUsed[pentominoValue - 1] = false
        setPentonimoUsed([...pentonimoUsed])

        setOver([x, y]);
    }
    //vybereme si pentomino
    function select(i: number) {
        if (selectedPentomino > 0) return;
        setSelectedPentomino(i)
    }
    //při změně souřadnic dílku se volá useEffect, který kontroluje jestli nejsou souřadnice mimo hranice pole nebo obsazený dílek
    useEffect(() => {
        setDisplayArea(playArea);
        if (x < 0) return;
        if (y < 0) return;
        if (selectedPentomino < 1) return;
        tryPlacePentomino(false)
    }, [x, y])
    //zavření okna s gratulací
    function close() {
        modal.onClose()
        reset()
    }

    return (
        <>
            <Tooltip width="20vw" label="Pomocí kláves R a F otáčej dílky a potom je přetáhni do hracího pole. Tvým úkolem je poskládat do pole všechny díky tak, aby ti žádný nezůstal." borderWidth='1px' borderRadius='lg'>
                <Box marginLeft="50%" minWidth="6rem" fontSize={{ base: "20px" }} width="8vw" borderRadius="1px" marginTop="10px" backgroundColor="blue.300" textAlign="center"> Jak hrát    <QuestionOutlineIcon /></Box>
            </Tooltip>
            <Center>
                <Grid width="50vw" height="50vh" padding={5} id="grid" style={{ gridTemplateColumns: `repeat(${playArea[0].length}, 1fr)`, gridTemplateRows: `repeat(${playArea.length}, 1fr)` }}>
                    {displayArea.map((row, rowIndex) => row.map((cell, i) => (
                        <div key={i} draggable="true"
                            className={"block p" + cell}
                            onDragEnter={() => setOver([rowIndex, i])}
                            onDragLeave={() => setOver([-1, -1])}
                            onDragStart={() => movePentomino(rowIndex, i, cell)}
                            onDrop={() => tryPlacePentomino(true)}
                            onDragEnd={() => tryPlacePentomino(true)}
                            onDragOver={e => e.preventDefault()}>
                        </div>
                    )))}
                </Grid>
            </Center>
            <Box className="toolbox" >
                {pentominoes.map((pentomino, i) => (
                    <>
                        {!pentonimoUsed[i] &&
                            <Box key={`p${i}`}
                                className="pentomino"
                                draggable="true"
                                tabIndex={i} onMouseEnter={e => e.currentTarget.focus()} onKeyDown={e => keyDown(e, i)}
                                onDragStart={() => select(i + 1)}>
                                {pentomino.map((row, indexRow) => row.map((cell, cellColumn) => (
                                    <>
                                        {!!cell &&
                                            <Box
                                                className={"block p" + (i + 1)}
                                                style={{ gridRow: indexRow + 1, gridColumn: cellColumn + 1 }}
                                                key={`px${i};${indexRow};${cellColumn}`}>
                                            </Box>
                                        }
                                    </>
                                )))}
                            </Box>}
                    </>
                ))}
            </Box>
            <Modal closeOnOverlayClick={false} isOpen={modal.isOpen} onClose={modal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Gratuluji. Úspěšně jsi dokončil hlavolam.</ModalHeader>
                    <ModalBody>
                        Chceš hrát znovu?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >
                            <LinkBox as={NextLink} href="./Home">
                                NE
                            </LinkBox>
                        </Button>
                        <Button variant='ghost' onClick={() => close()}>ANO</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <HStack paddingLeft={"50%"} paddingTop="10px">
                <Button backgroundColor="blue.300" fontSize={{ base: "24px" }} onClick={() => reset()}>restart</Button>
            </HStack>
        </>
    )
}