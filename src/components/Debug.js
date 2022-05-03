import React from "react";

export default function Debug(props){
    return(
        <div>
            <p className="white">przejdz do strony</p>
            <form onSubmit={props.submitPage}>
                <input type="text"/>
                <input type="submit"/>
            </form>
            <p className="white">dodaj do eq</p>
            <form onSubmit={props.submitEq}>
                <input type="text"/>
                <input type="submit"/>
            </form>
        </div>
    )
}