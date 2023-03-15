import {
    Box,
    Tooltip,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    LinkBox,
    useDisclosure,
    Image,
    Center
} from "@chakra-ui/react"
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import NextLink from "next/link"
import React from "react"
import { useUserContext } from './userContext'



export function Lightsaber() {
    let hodnoty = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    let zvoleneId = 0
    let pocetDvojek = 0;
    const { updateSaber } = useUserContext()
    const modalLost = useDisclosure()
    const modalWin = useDisclosure()

    const tah = (id: number) => {
        const popupSmer = document.getElementById("popup-smer") as HTMLElement;
        const popupNemuzes = document.getElementById("popup-nemuzes") as HTMLElement;
        zvoleneId = id;
        let moznostVlevo = false;
        let moznostVpravo = false;

        //kontrola leve strany
        let hodnotaSkoku = 0;
        let soucetHodnot = 0;

        for (let i = id - 1; i >= 0; i--) {
            if (soucetHodnot == 2 && hodnoty[i] == 1) {
                popupNemuzes.style.display = "none";
                moznostVlevo = true;
                break;
            }
            soucetHodnot += hodnoty[i];
        }

        //kontrola prave strany
        hodnotaSkoku = 0;
        soucetHodnot = 0;

        for (let i = id + 1; i < 10; i++) {
            if (soucetHodnot == 2 && hodnoty[i] == 1) {
                popupNemuzes.style.display = "none";
                moznostVpravo = true;
                break;
            }
            soucetHodnot += hodnoty[i];
        }

        if (moznostVlevo && moznostVpravo && hodnoty[id] == 1) {
            popupSmer.style.display = "block";
            //console.log(popupSmer)
            return;
        } else {
            popupSmer.style.display = "none";
        }

        if (moznostVlevo) {
            popupSmer.style.display = "none";
            smer(false);
            return;
        }
        if (moznostVpravo) {
            popupSmer.style.display = "none";
            smer(true);
            return;
        }
        popupNemuzes.style.display = "block";
    }

    const smer = (smer: boolean) => {
        const popupSmer = document.getElementById("popup-smer") as HTMLElement;
        const popupNemuzes = document.getElementById("popup-nemuzes") as HTMLElement;
        let preskoceneSirky = 0;
        let konecneId = zvoleneId;
        popupSmer.style.display = "none"

        //vpravo
        if (smer) {
            do {
                konecneId++;
                if (preskoceneSirky == 2 && hodnoty[konecneId] == 1 && hodnoty[zvoleneId] == 1) {
                    (document.getElementById(konecneId.toString()) as HTMLImageElement).src = "crossedlightsabers.png";
                    (document.getElementById(zvoleneId.toString()) as HTMLImageElement).src = "lightsaber-nic.png";
                    hodnoty[zvoleneId] = 0;
                    hodnoty[konecneId] = 2
                }

                preskoceneSirky += hodnoty[konecneId];
            } while (preskoceneSirky < 3);
        }
        //vlevo
        else {
            do {
                konecneId--;
                if (preskoceneSirky == 2 && hodnoty[konecneId] == 1 && hodnoty[zvoleneId] == 1) {
                    (document.getElementById(konecneId.toString()) as HTMLImageElement).src = "crossedlightsabers.png";
                    (document.getElementById(zvoleneId.toString()) as HTMLImageElement).src = "lightsaber-nic.png";
                    hodnoty[zvoleneId] = 0;
                    hodnoty[konecneId] = 2;

                }

                preskoceneSirky += hodnoty[konecneId];
            } while (preskoceneSirky < 3);
        }

        let moznostPokracovat = false;

        for (let j = 0; j < 10; j++) {
            if (hodnoty[j] != 1)
                continue;

            let moznostVlevo = false;
            let moznostVpravo = false;

            //kontrola leve strany
            let soucetHodnot = 0;
            for (let i = j - 1; i >= 0; i--) {
                if (soucetHodnot == 2 && hodnoty[i] == 1) {
                    moznostVlevo = true;
                    break;
                }
                soucetHodnot += hodnoty[i];
            }

            //kontrola prave strany
            soucetHodnot = 0;

            for (let i = j + 1; i < 10; i++) {
                if (soucetHodnot == 2 && hodnoty[i] == 1) {
                    moznostVpravo = true;
                    break;
                }
                soucetHodnot += hodnoty[i];
            }

            if (moznostVlevo || moznostVpravo) {
                moznostPokracovat = true;
            }
        }

        if (!moznostPokracovat) {
            for (let i = 0; i < 10; i++) {
                if (hodnoty[i] == 1) {
                    popupNemuzes.style.display = "none"
                    popupSmer.style.display = "none"
                    modalLost.onOpen()
                    //console.log("Jiz nemuzes hnout s zadnou sirkou");
                    break;
                }
            }
        }

        pocetDvojek = 0;
        for (let i = 0; i < 10; i++) {
            if (hodnoty[i] === 2) {
                pocetDvojek++;
            }
        }

        if (pocetDvojek == 5) {
            popupNemuzes.style.display = "none"
            popupSmer.style.display = "none"
            modalWin.onOpen()
            updateSaber()

        }
    }

    const reset = () => {
        const popupSmer = document.getElementById("popup-smer") as HTMLElement;
        const popupNemuzes = document.getElementById("popup-nemuzes") as HTMLElement;
        hodnoty = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        zvoleneId = 0
        pocetDvojek = 0

        for (let i = 0; i < 10; i++) {
            let lightsaber = document.getElementById(`${i}`) as HTMLImageElement
            lightsaber.src = "lightsaber.png"
        }
        popupNemuzes.style.display = "none"
        popupSmer.style.display = "none"
    }
    function close() {
        modalWin.onClose();
        modalLost.onClose()
        reset()
    }

    return (
        <>
            <Button backgroundColor="blue.300" marginLeft={5} marginTop={5} onClick={() => reset()} >Restart</Button>
            <Center>
                <Box className="puzzle">
                    <Image className="lightsaber" id="0" onClick={() => tah(0)} src="lightsaber.png"></Image>
                    <Image className="lightsaber" id="1" onClick={() => tah(1)} src="lightsaber.png"></Image>
                    <Image className="lightsaber" id="2" onClick={() => tah(2)} src="lightsaber.png"></Image>
                    <Image className="lightsaber" id="3" onClick={() => tah(3)} src="lightsaber.png"></Image>
                    <Image className="lightsaber" id="4" onClick={() => tah(4)} src="lightsaber.png"></Image>
                    <Image className="lightsaber" id="5" onClick={() => tah(5)} src="lightsaber.png"></Image>
                    <Image className="lightsaber" id="6" onClick={() => tah(6)} src="lightsaber.png"></Image>
                    <Image className="lightsaber" id="7" onClick={() => tah(7)} src="lightsaber.png"></Image>
                    <Image className="lightsaber" id="8" onClick={() => tah(8)} src="lightsaber.png"></Image>
                    <Image className="lightsaber" id="9" onClick={() => tah(9)} src="lightsaber.png"></Image>
                </Box>
            </Center>
            <Tooltip width={{ base: "20vw" }} label="Kliknutím na světelný meč skočíš o 3 meče dopředu a utvoříš kříž. Tvým cílem je utvořit 5 křížků a tím vyřešit hlavolam." borderWidth='1px' borderRadius='lg'>
                <Box fontSize={{ base: "20px" }} backgroundColor="blue.300" marginLeft="50%" width="100px" borderRadius="3px" marginTop="10px" textAlign="center"> Jak hrát    <QuestionOutlineIcon /></Box>
            </Tooltip>

            <Card display="none" id="popup-smer" width="270px" margin="auto">
                <CardBody >
                    <Text>Zvol si směr kterým chceš hrát</Text>
                    <HStack spacing="75px">
                        <Button backgroundColor="blue.300" onClick={() => smer(false)} >Vlevo</Button>
                        <Button backgroundColor="blue.300" onClick={() => smer(true)} >Vpravo</Button>
                    </HStack>
                </CardBody>
            </Card>

            <Card id="popup-nemuzes" display="none" width="410px" margin="auto">
                <CardBody>
                    <Text>S tímto mečem nemůžeš táhnout. Klikni na jiný meč.</Text>
                </CardBody>
            </Card>

            <Modal closeOnOverlayClick={false} isOpen={modalWin.isOpen} onClose={modalWin.onClose}>
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

            <Modal closeOnOverlayClick={false} isOpen={modalLost.isOpen} onClose={modalLost.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Je mi líto. Bohužel jsi nevyřešil hlavolam.</ModalHeader>
                    <ModalBody>
                        Chceš to zkusit znovu?
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
        </>
    )
}