import React from "react"

export default function Eq(props){

    return(
        <div className="equipment">
            <h4 className="white">Ekwipunek</h4>
            <div className="equipment_items">
                {props.equipment.map(item => (
                    <p className="white">{item}</p>
                ))}
            </div>
        </div>
    )
}