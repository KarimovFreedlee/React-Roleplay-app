import React from 'react'

export default function Abilitys(props) {

    return (
        <div className = "container">
            <div className = "row">
                <div className = "card col-sm row justify-content-md-center">
                    {props.firstColumn}
                </div>
                <div className = "card col-sm row justify-content-md-center">
                    {props.secondColumn}
                </div>
                <div className = "card col-sm row justify-content-md-center">
                    {props.thirdColumn}
                </div>
            </div>
        </div>
    )
}
