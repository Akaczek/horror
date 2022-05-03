import React from "react";

export default function Card(props){

    if(props.card.hasOwnProperty("random")){
        const nextCard = props.card["random"]["out"][Math.floor((Math.random()*props.card["random"]["out"].length))]
        return(
            <div className="card">
                <p className="white">{props.card["desc"]}</p>
                <div className="buttons">
                    <button onClick={props.click} value={nextCard}>{props.card["random"]["buttonText"]}</button>
                </div>
            </div>
        )
    }else{
        return(
            <div className="card">
                <p className="white">{props.card["desc"]}</p>
                <div className="buttons">
                    {props.card["next"].map(function(item){
                        if(item.hasOwnProperty("required")){
                            if(props.equipment.includes(item["required"])){
                                return (<button onClick={props.click} value={item["nextCard"]}>{item["buttonText"]}</button>)
                            }
                        }else{
                            return (<button onClick={props.click} value={item["nextCard"]}>{item["buttonText"]}</button>)
                        }
                    })}
                    {/* {props.card["next"].map(item => (
                        <button onClick={props.click} value={item["nextCard"]}>{item["buttonText"]}</button>
                    ))} */}
                </div>
            </div>
        )
    }
}