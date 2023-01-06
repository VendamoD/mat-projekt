import React from "react"
import { Button } from "react-bootstrap"
import { useUserContext } from '../components/userContext'


export function WolfAndGoat() {
    let leftSide = ["goat", "wolf", "cabbage"]
    let rightSide = [""]
    let alreadyPlaying = false
    let playerSide = "left"
    const {updateWolfAndGoat} = useUserContext()


    function moveWolf() {
        
        if(playerSide == "left" && !leftSide.includes("wolf") || playerSide == "right" && !rightSide.includes("wolf") ) {
            console.log("you cannot do that")
        } else if (leftSide.includes("wolf")) {
            const wolfIndex = leftSide.indexOf("wolf")
            rightSide.push("wolf")
            leftSide.splice(wolfIndex, 1)
            playerSide = "right"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)

        } else if (rightSide.includes("wolf")) {
            const wolfIndex = rightSide.indexOf("wolf")
            leftSide.push("wolf")
            rightSide.splice(wolfIndex, 1)
            playerSide = "left"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)
        } 

        alreadyPlaying = true
        checkGame()
    }
    function moveCabbage() {

        if(playerSide == "left" && !leftSide.includes("cabbage") || playerSide == "right" && !rightSide.includes("cabbage") ) {
            console.log("you cannot do that")
        } else if (leftSide.includes("cabbage")) {
            const cabbageIndex = leftSide.indexOf("cabbage")
            rightSide.push("cabbage")
            leftSide.splice(cabbageIndex, 1)
            playerSide = "right"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)

        } else if (rightSide.includes("cabbage")) {
            const cabbageIndex = rightSide.indexOf("cabbage")
            leftSide.push("cabbage")
            rightSide.splice(cabbageIndex, 1)
            playerSide = "left"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)
        }
        

        alreadyPlaying = true
        checkGame()
    }

    function moveGoat() {

        if(playerSide == "left" && !leftSide.includes("goat") || playerSide == "right" && !rightSide.includes("goat") ) {
            console.log("you cannot do that")
        } else if (leftSide.includes("goat")) {
            const goatIndex = leftSide.indexOf("goat")
            rightSide.push("goat")
            leftSide.splice(goatIndex, 1)
            playerSide = "right"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)

        } else if (rightSide.includes("goat")) {
            const goatIndex = rightSide.indexOf("goat")
            leftSide.push("goat")
            rightSide.splice(goatIndex, 1)
            playerSide = "left"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)
        }
        
        alreadyPlaying = true
        checkGame()
    }

    function moveEmpty() {
        if(playerSide == "right") {
            playerSide = "left"
        } else playerSide = "right"
        checkGame()
        console.log(playerSide)
    }

    function checkGame() {
        if (alreadyPlaying) {
            if (playerSide == "right" && rightSide.includes("goat") && rightSide.includes("wolf") || playerSide == "right" && rightSide.includes("goat") && rightSide.includes("cabbage")) {
                console.log("game continues")
            } else if (playerSide == "left" && leftSide.includes("goat") && leftSide.includes("wolf") || playerSide == "left" && leftSide.includes("goat") && leftSide.includes("cabbage")) {
                console.log("game continues")
            } else if (leftSide.includes("wolf") && leftSide.includes("goat") || leftSide.includes("goat") && leftSide.includes("cabbage")) {
                console.log("game failed")
            } else if (rightSide.includes("wolf") && rightSide.includes("goat") || rightSide.includes("goat") && rightSide.includes("cabbage")) {
                console.log("game failed")
            }
        }
        if (rightSide.includes("goat") && rightSide.includes("wolf") && rightSide.includes("cabbage")) {
            console.log("game won")
            updateWolfAndGoat()
        }
    }

    return (
        <>
            <Button onClick={() => moveGoat()}>Koza </Button>
            <Button onClick={() => moveWolf()}>Vlk </Button>
            <Button onClick={() => moveCabbage()}>Zelí </Button>
            <Button onClick={() => moveEmpty()}>Přejeď na druhou stranu</Button>
        </>
    )
}