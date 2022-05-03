import React, { useState } from "react"
import story from "./story.json"
import Card from './components/Card'; 
import Debug from "./components/Debug"; 
import Eq from "./components/Eq"

export default function App(){

    const [currentCard, changeCard] = useState("start")
    const [eq, changeEq] = useState(["latarka"])
    const [back_color, changeBackColor] = useState("black_back")
    const [scary, changeScary] = useState(false)
    const [shaky, changeShaky] = useState(false)
    const [scaryText, changeScaryText] = useState("")
    const [lightLevel, changeLightLevel] = useState(0)
    const [bezpieczniki, changeBezp] = useState([])

    const debug = false

    function filterById(jsonObject, id) {
        return jsonObject.filter(function(jsonObject) {
            return (jsonObject['id'] === id);
        })[0];
    }

    function handleClick(e){
        e.preventDefault()
        let card = filterById(story,e.target.value)

        //znalazłeś item
        if(card.hasOwnProperty("item")){
            if(!eq.includes(card["item"])){
                const newEq = eq.map(a => a)
                const newBezp = bezpieczniki.map(a => a) 
                if(card["item"] === "bezpiecznik A"){
                    if (!newBezp.includes("A")){
                        newBezp.push("A")
                        newEq.push(card["item"])
                    }
                }else if(card["item"] === "bezpiecznik B"){
                    if (!newBezp.includes("B")){
                        newBezp.push("B")
                        newEq.push(card["item"])
                    }
                }else if(card["item"] === "bezpiecznik C"){
                    if (!newBezp.includes("C")){
                        newBezp.push("C")
                        newEq.push(card["item"])
                    }
                }else{
                    newEq.push(card["item"])    
                }
                changeBezp(newBezp)
                changeEq(newEq)
            }
        }

        //wykorzystałeś item
        if(card.hasOwnProperty("delete")){
            let newEq = []
            for(let item in eq){
                if(eq[item] !== card["delete"]){
                    newEq.push(eq[item])
                }
            }
            changeEq(newEq)
        }

        //zwiększono światło
        if(card.hasOwnProperty("light")){
            let newLight = lightLevel
            newLight += card["light"]
            switch(newLight){
                case 1:
                    changeBackColor("flashlight")
                    break
                case 2:
                    changeBackColor("one_candle")
                    break
                case 3:
                    changeBackColor("two_candles")
                    break
                case 4:
                    changeBackColor("three_candles")
                    break
                default:
                    changeBackColor("black_back")
                    break
            }
            changeLightLevel(newLight)
        }

        //straszny napis
        if(card.hasOwnProperty("scary")){
            changeScary(true)
            if(card.hasOwnProperty("shaky")){
                changeShaky(true)
            }
            printLetterByLetter(card, 200)
        }else{
            changeCard(e.target.value)
        }
        

        if(lightLevel === 4){
            if(!eq.includes("prad")){
                const newEq = eq.map(a => a)
                newEq.push("prad")
                changeEq(newEq)
            }
        }
    }

    function printLetterByLetter(object, speed){
        var i = 0;
        let oldLight = lightLevel
        changeBackColor("black_back")
        let msg = ""
        var interval = setInterval(function(){
            msg = msg + object["scary"].charAt(i)
            changeScaryText(msg)
            i++;
            if (i > object["scary"].length){
                clearInterval(interval);
            }
            
                if(msg.length === object["scary"].length){
                    changeScary(false)
                    changeShaky()
                    changeScaryText("")
                    changeCard(object["next"])
                    switch(oldLight){
                        case 1:
                            changeBackColor("flashlight")
                            break
                        case 2:
                            changeBackColor("one_candle")
                            break
                        case 3:
                            changeBackColor("two_candles")
                            break
                        case 4:
                            changeBackColor("three_candles")
                            break
                        default:
                            changeBackColor("black_back")
                            break
                    }
                }
            
        }, speed);

        
    }

    // DEBUG
    function handleDebugPage(e){
        e.preventDefault()
        changeCard(e.target[0].value)
    }

    function handleDebugEq(e){
        e.preventDefault()
        const newEq = eq.map(a => a)
        newEq.push(e.target[0].value)
        changeEq(newEq)
    }

    return(
        <div>
        {scary 
            ? <div id="main" className={back_color}>
                <h1 className={shaky ? "white shake" : "white"}>{scaryText}</h1>
            </div>
            : <div id="main" className={back_color}>
            <Eq 
                equipment={eq}
            />
            {debug && <Debug
                submitPage={handleDebugPage}
                submitEq={handleDebugEq}
            />}
            <Card
                card = {filterById(story, currentCard)}
                click = {handleClick}
                equipment = {eq}
            />
            </div>}
        </div>
    )
}