import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"

export default function Character() {

    const { getuid } = useAuth() 
    const location = useLocation();
    const [data, setData] = useState({})

    async function getCharacterData(){
        await db.collection("users").doc(getuid()).collection('characters').doc(location.state.id).get().then(doc => {
            if(doc.exists) {
                setData(doc.data())
            } else console.log('doc does not exist')
        })
    }

    function modifier (val){
        if(val == null || val.isEmpty){
          return 0;
        };
        if(val % 2 === 0){
          return (val - 10)/2;
        } else{
          return (val - 11)/2;
        }
      }

    useEffect(() => {
        getCharacterData();
      }, []);


    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-sm row justify-content-md-center">
                        Name
                    </div>
                    <div class="col-sm row justify-content-md-center">
                        Score
                    </div>
                    <div class="col-sm row justify-content-md-center">
                        M
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-sm row justify-content-md-center">
                        STR
                    </div>
                    <div class="col-sm row justify-content-md-center">
                        {data.STR}
                    </div>
                    <div class="col-sm row justify-content-md-center">
                        {modifier(data.STR)}
                    </div>
                </div>
            </div>
        </div>  
    )
}
