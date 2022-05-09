import React from "react"
import "./container.css"

function Container (props) {


    return (
        <div className="container">
            {props.display}
        </div>
    )
}

export default Container