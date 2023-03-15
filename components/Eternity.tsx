import React, { useEffect, useState } from "react"
import NextLink from "next/link"
import { Box, Image, LinkBox, Text, HStack, Grid, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, TagRightIcon, Center, Tooltip } from "@chakra-ui/react"
import { useUserContext } from './userContext'
import { QuestionOutlineIcon } from "@chakra-ui/icons"

function getNeighbours(x: number, y: number, playarea: number[][]) {
  return {
    top: (playarea[x - 1] ?? [])[y],
    bottom: (playarea[x + 1] ?? [])[y],
    left: playarea[x][y - 1],
    right: playarea[x][y + 1]
  }
}

function rotate(x: Omit<EternityVal, "placed">) {
  const right = x.right
  const top = x.top
  const bottom = x.bottom
  const left = x.left
  x.right = top
  x.top = left
  x.bottom = right
  x.left = bottom
  x.rotated += 1;
}

interface EternityVal {
  id: number
  top: number
  left: number
  right: number
  bottom: number
  rotated: number
  placed: boolean
}

const eternityVals: Omit<EternityVal, "rotated" | "placed">[] = [
  {
    id: 1,
    top: 0,
    left: 0,
    right: 1,
    bottom: 1
  },
  {
    id: 2,
    top: 0,
    left: 1,
    right: 2,
    bottom: 3
  },
  {
    id: 3,
    top: 0,
    left: 2,
    right: 4,
    bottom: 5
  },
  {
    id: 4,
    top: 0,
    left: 4,
    right: 6,
    bottom: 7
  },
  {
    id: 5,
    top: 0,
    left: 6,
    right: 7,
    bottom: 8
  },
  {
    id: 6,
    top: 0,
    left: 7,
    right: 1,
    bottom: 5
  },
  {
    id: 7,
    top: 0,
    left: 1,
    right: 0,
    bottom: 4
  },
  {
    id: 8,
    top: 1,
    left: 0,
    right: 9,
    bottom: 7
  },
  {
    id: 9,
    top: 3,
    left: 9,
    right: 10,
    bottom: 8
  },
  {
    id: 10,
    top: 5,
    left: 10,
    right: 3,
    bottom: 11
  },
  {
    id: 11,
    top: 7,
    left: 3,
    right: 7,
    bottom: 5
  },
  {
    id: 12,
    top: 8,
    left: 7,
    right: 11,
    bottom: 11
  },
  {
    id: 13,
    top: 5,
    left: 11,
    right: 5,
    bottom: 10
  },
  {
    id: 14,
    top: 4,
    left: 5,
    right: 0,
    bottom: 7
  },
  {
    id: 15,
    top: 7,
    left: 0,
    right: 8,
    bottom: 7
  },
  {
    id: 16,
    top: 8,
    left: 8,
    right: 3,
    bottom: 11
  },
  {
    id: 17,
    top: 11,
    left: 3,
    right: 8,
    bottom: 8
  },
  {
    id: 18,
    top: 5,
    left: 8,
    right: 7,
    bottom: 7
  },
  {
    id: 19,
    top: 11,
    left: 7,
    right: 12,
    bottom: 13
  },
  {
    id: 20,
    top: 10,
    left: 12,
    right: 10,
    bottom: 8
  },
  {
    id: 21,
    top: 7,
    left: 10,
    right: 0,
    bottom: 6
  },
  {
    id: 22,
    top: 7,
    left: 0,
    right: 11,
    bottom: 1
  },
  {
    id: 23,
    top: 11,
    left: 11,
    right: 12,
    bottom: 8
  },
  {
    id: 24,
    top: 8,
    left: 12,
    right: 13,
    bottom: 5
  },
  {
    id: 25,
    top: 7,
    left: 13,
    right: 3,
    bottom: 8
  },
  {
    id: 26,
    top: 13,
    left: 3,
    right: 12,
    bottom: 11
  },
  {
    id: 27,
    top: 8,
    left: 12,
    right: 13,
    bottom: 7
  },
  {
    id: 28,
    top: 6,
    left: 13,
    right: 0,
    bottom: 1
  },
  {
    id: 29,
    top: 1,
    left: 0,
    right: 5,
    bottom: 1
  },
  {
    id: 30,
    top: 8,
    left: 5,
    right: 11,
    bottom: 8
  },
  {
    id: 31,
    top: 5,
    left: 11,
    right: 10,
    bottom: 3
  },
  {
    id: 32,
    top: 8,
    left: 10,
    right: 7,
    bottom: 3
  },
  {
    id: 33,
    top: 11,
    left: 7,
    right: 8,
    bottom: 12
  },
  {
    id: 34,
    top: 7,
    left: 8,
    right: 11,
    bottom: 10
  },
  {
    id: 35,
    top: 1,
    left: 11,
    right: 0,
    bottom: 1
  },
  {
    id: 36,
    top: 1,
    left: 0,
    right: 5,
    bottom: 2
  },
  {
    id: 37,
    top: 8,
    left: 5,
    right: 3,
    bottom: 5
  },
  {
    id: 38,
    top: 3,
    left: 3,
    right: 7,
    bottom: 8
  },
  {
    id: 39,
    top: 3,
    left: 7,
    right: 8,
    bottom: 13
  },
  {
    id: 40,
    top: 12,
    left: 8,
    right: 13,
    bottom: 10
  },
  {
    id: 41,
    top: 10,
    left: 13,
    right: 8,
    bottom: 5
  },
  {
    id: 42,
    top: 1,
    left: 8,
    right: 0,
    bottom: 2
  },
  {
    id: 43,
    top: 2,
    left: 0,
    right: 4,
    bottom: 0
  },
  {
    id: 44,
    top: 5,
    left: 4,
    right: 4,
    bottom: 0
  },
  {
    id: 45,
    top: 8,
    left: 4,
    right: 6,
    bottom: 0
  },
  {
    id: 46,
    top: 13,
    left: 6,
    right: 7,
    bottom: 0
  },
  {
    id: 47,
    top: 10,
    left: 7,
    right: 6,
    bottom: 0
  },
  {
    id: 48,
    top: 5,
    left: 6,
    right: 2,
    bottom: 0
  },
  {
    id: 49,
    top: 2,
    left: 2,
    right: 0,
    bottom: 0
  },
]
function randomizeEternities(): EternityVal[] {
  const x = eternityVals.sort(() => Math.random() - 0.5).map(x => ({ ...x, rotated: 0 }));
  const rnds = eternityVals.map(x => Math.floor(Math.random() * 4));
  x.forEach((x, i) => {
    for (let j = 0; j < rnds[i]; j++) {
      rotate(x)
    }
  })
  return x.map((x, i) => ({
    ...x,
    placed: false
  }));
}



export function Eternity() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { updateEternity } = useUserContext()
  const [playArea, setPlayArea] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ]);
  const [eternities, setEternities] = useState(randomizeEternities());

  function dragStart(event: React.DragEvent<HTMLImageElement>) {
    event.dataTransfer.setData('text', event.currentTarget.id)
  }

  function checkResult(playArea: number[][]) {
    let isFinished = true;
    for (let i = 0; i < playArea.length; i++) {
      for (let j = 0; j < playArea[i].length; j++) {
        if (playArea[i][j] == 0) {
          isFinished = false;
        }
      }
    }
    if (isFinished) {
      updateEternity()
      onOpen()
    }

  }

  function keyDown(e: React.KeyboardEvent<HTMLDivElement>, x: EternityVal) {
    if (e.key == "r") {
      const et = eternities.find(e => e.id == x.id)
      if (!et) return;
      rotate(et);
      setEternities([...eternities])
    }

  }

  function takeOut(cell: number) {
    const et = eternities.find(x => x.id == cell)
    if (!et) return;
    et.placed = false
    setEternities([...eternities]);
    for (let i = 0; i < playArea.length; i++) {
      for (let y = 0; y < playArea[i].length; y++) {
        if (playArea[i][y] == cell) {
          playArea[i][y] = 0
          setPlayArea([...playArea])
        }
      }
    }
  }

  function restart() {
    //const et = eternities.find(e => e.id == x.id)?.id
    setPlayArea([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ])
    setEternities(randomizeEternities())
  }

  function drop(rowIndex: number, i: number) {
    return (event: React.DragEvent<HTMLImageElement>) => {
      const id = parseInt(event.dataTransfer.getData('text'))

      const et = eternities.find(x => x.id == id)
      if (!et) return;
      const neighbors = getNeighbours(rowIndex, i, playArea)

      if (neighbors.top && eternities.find(x => x.id == neighbors.top)?.bottom !== et.top) return;
      if (neighbors.left && eternities.find(x => x.id == neighbors.left)?.right !== et.left) return;
      if (neighbors.right && eternities.find(x => x.id == neighbors.right)?.left !== et.right) return;
      if (neighbors.bottom && eternities.find(x => x.id == neighbors.bottom)?.top !== et.bottom) return;

      et.placed = true
      setEternities([...eternities]);
      for (let i = 0; i < playArea.length; i++) {
        for (let y = 0; y < playArea[i].length; y++) {
          if (playArea[i][y] == id) {
            playArea[i][y] = 0
          }
        }
      }
      playArea[rowIndex][i] = id;
      setPlayArea([...playArea])
      checkResult(playArea)
    }
  }

  return (
    <>
      <Center>
        <Grid paddingTop={5} id="gridEternity" style={{ gridTemplateColumns: `repeat(${playArea[0].length}, 50px)`, gridTemplateRows: `repeat(${playArea.length}, 50px)` }}>
          {playArea.map((row, rowIndex) => row.map((cell, i) => (
            <Box key={i} id={`${cell}`} draggable="true"
              className="block"
              onDrop={drop(rowIndex, i)}
              onDragStart={dragStart}
              onContextMenu={(e) => {
                e.preventDefault()
                takeOut(cell)
              }}
              onDragOver={e => e.preventDefault()}>
              {!!cell && <img src={`eternity/eternity${cell}.png`} style={{ transform: `rotate(${(eternities.find(x => x.id == cell)?.rotated ?? 0) * 90}deg)` }} />}
            </Box>
          )))}
        </Grid>
      </Center>
      <Box paddingLeft="2vw" padding={2} className="toolbox">
        {eternities.filter(x => !x.placed).map(x => (
          <Image width={{ xl: "3vw", md: "4vw", base: "8vw" }} key={x.id} src={`eternity/eternity${x.id}.png`} style={{ transform: `rotate(${x.rotated * 90}deg)` }} draggable="true" id={`${x.id}`}
            onDragStart={dragStart}
            tabIndex={x.id}
            onMouseEnter={e => e.currentTarget.focus()}
            onKeyDown={e => keyDown(e, x)} />
        ))}
      </Box>
      <Center>
        <Button backgroundColor="blue.300" onClick={() => restart()} >Restart</Button>
        <Tooltip width="40vw" label="Tvým úkolem je poskládat dílky správnými stranami k sobě, tak aby vytvořili obrázek. Dílky můžeš otáčet pomocí klávesy R a pokud klikneš na položený dílek pravým tlačítkem, tak jej vyndáš z pole ven." borderWidth='1px' borderRadius='lg'>
          <Box backgroundColor="blue.300" fontSize={{ base: "20px" }} marginLeft={"10px"} width="100px" borderRadius="1px" marginTop="10px" textAlign="center"> Jak hrát    <QuestionOutlineIcon /></Box>
        </Tooltip>
      </Center>


      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Gratuluji. Úspěšně jsi dokončil hlavolam.</ModalHeader>
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
    </>
  )
}