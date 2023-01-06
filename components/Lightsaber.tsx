import { Box, Tooltip } from "@chakra-ui/react"
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import React, { useEffect } from "react"
import { useUserContext } from './userContext'

export function Lightsaber() {
    let hodnoty = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    let zvoleneId = 0
    let pocetDvojek = 0;
    const {updateSaber} = useUserContext()

    

    const tah = (id: number) => {
        const popupVyhra = document.getElementById("popup-vyhra") as HTMLElement;
        const popupProhra = document.getElementById("popup-prohra") as HTMLElement;
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
        let preskoceneSirky = 0;
        let konecneId = zvoleneId;
        const popupVyhra = document.getElementById("popup-vyhra") as HTMLElement;
        const popupProhra = document.getElementById("popup-prohra") as HTMLElement;
        const popupSmer = document.getElementById("popup-smer") as HTMLElement;
        const popupNemuzes = document.getElementById("popup-nemuzes") as HTMLElement;
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
                    popupProhra.style.display = "block"
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
            popupVyhra.style.display = "block"
            updateSaber()
            //console.log("Vyhral jsi");

        }
    }

    const reset = () => {
        hodnoty = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        zvoleneId = 0
        pocetDvojek = 0
        const popupVyhra = document.getElementById("popup-vyhra") as HTMLElement;

        for(let i = 0; i < 10; i++) {
            let lightsaber = document.getElementById(`${i}`) as HTMLImageElement
            lightsaber.src = "lightsaber.png"
        }
        popupVyhra.style.display = "none"
    }

    return (
        <>
            <div className="puzzle">
                <img className="lightsaber" id="0" onClick={() => tah(0)} src="lightsaber.png"></img>
                <img className="lightsaber" id="1" onClick={() => tah(1)} src="lightsaber.png"></img>
                <img className="lightsaber" id="2" onClick={() => tah(2)} src="lightsaber.png"></img>
                <img className="lightsaber" id="3" onClick={() => tah(3)} src="lightsaber.png"></img>
                <img className="lightsaber" id="4" onClick={() => tah(4)} src="lightsaber.png"></img>
                <img className="lightsaber" id="5" onClick={() => tah(5)} src="lightsaber.png"></img>
                <img className="lightsaber" id="6" onClick={() => tah(6)} src="lightsaber.png"></img>
                <img className="lightsaber" id="7" onClick={() => tah(7)} src="lightsaber.png"></img>
                <img className="lightsaber" id="8" onClick={() => tah(8)} src="lightsaber.png"></img>
                <img className="lightsaber" id="9" onClick={() => tah(9)} src="lightsaber.png"></img>
            </div>

            <Tooltip maxW="lm" label="Kliknutím na světelný meč skočíš o 3 meče dopředu. Tvým cílem je utvořit 5 křížků a tím vyřešit hlavolam." borderWidth='1px' borderRadius='lg'>
                <Box backgroundColor="blackAlpha.200" marginLeft="50%" width="75px" borderRadius="10px" text-align="center"> Jak hrát    <QuestionOutlineIcon /></Box> 
            </Tooltip>

            <div className="popup" id="popup-smer" style={{ display: "none" }}>
                <p>Zvol si směr.</p>
                <button className="btn" onClick={() => smer(false)}>Doleva</button>
                <button className="btn" onClick={() => smer(true)}>Doprava</button>
            </div>

            <div className="popup" id="popup-nemuzes" style={{ display: "none" }}>
                <p>S touto sirkou nemůžeš táhnout. Klikni na jinou sirku.</p>
            </div>

            <div className="popup" id="popup-vyhra" style={{ display: "none" }}>
                <p>Úspěšně jsi dokončil hlavolam. Gratuluji!</p>
                <p>Chceš hrát znovu ?</p>
                <button className="btn" onClick={() => reset()}>Ano</button>
                <button className="btn">Ne</button>

            </div>

            <div className="popup" id="popup-prohra" style={{ display: "none" }}>
                <p>Je mi líto, ale bohužel jsi nevyřešil hlavolam.</p>
            </div>
        </>
    )
}