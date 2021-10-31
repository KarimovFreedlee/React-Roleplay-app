import React from 'react'

export default function Skills(props) {
    return (
        <div class="container">
            <div class="row">
                <div class="card col-sm row justify-content-md-center">
                    {props.firstColumn}
                </div>
                <div class="card col-sm row justify-content-md-center">
                    {props.secondColumn}
                </div>
                <div class="card col-sm row justify-content-md-center">
                    {props.thirdColumn}
                </div>
                <div class="card col-sm row justify-content-md-center">
                    {props.fourthColumn}
                </div>
            </div>
        </div>
    )
}
