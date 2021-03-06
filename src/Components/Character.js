import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import { useHistory } from "react-router-dom"
import Abilitys from './Abilitys'
import Skills from './Skills'
import Header from './Header'


export default function Character() {

    const { getuid } = useAuth() 
    const location = useLocation();
    const [data, setData] = useState({})
    const [dataLoading, setDataLoading] = useState(true)
    const [classesData, setClassesData] = useState({})
    const [classesLoading, setClassesLoading ] = useState(true);
    const [characterClass, setCharacterClass] = useState('')


    async function getCharacterData(){
        await db.collection("users").doc(getuid()).collection('characters').doc(location.state.id).get().then(doc => {
            if(doc.exists) {
                setData(doc.data())
                getClassesData(doc.data().class)
                if(dataLoading){
                    setDataLoading(false)
                    console.log('data loaded')
                }
            } else console.log('doc does not exist')
        })
    }

    async function getClassesData(characterClass){
        await db.collection("classes").doc(characterClass).get().then(doc => {
            if(doc.exists){
                setClassesData(doc.data())
                if(classesLoading){
                    setClassesLoading(false)
                    console.log('classes loaded')
                }
            } else console.log('classes dont find')
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

    function totalBonus(ranks, ability){
        return modifier(ability) + ranks
    }

    useEffect(() => {
        getCharacterData()
    },[]);

    if( classesLoading || dataLoading){
        return <h1>Loading</h1>
    }

    return (
        <div>
            <Header/>
            <Abilitys firstColumn = 'Name' secondColumn = 'Score' thirdColumn = 'Modify'/>
            <Abilitys firstColumn = 'STR' secondColumn = {data.STR} thirdColumn = {modifier(data.STR)}/>
            <Abilitys firstColumn = 'DEX' secondColumn = {data.DEX} thirdColumn = {modifier(data.DEX)}/>
            <Abilitys firstColumn = 'CON' secondColumn = {data.CON} thirdColumn = {modifier(data.CON)}/>
            <Abilitys firstColumn = 'INT' secondColumn = {data.INT} thirdColumn = {modifier(data.INT)}/>
            <Abilitys firstColumn = 'WIS' secondColumn = {data.WIS} thirdColumn = {modifier(data.WIS)}/>
            <Abilitys firstColumn = 'CHA' secondColumn = {data.CHA} thirdColumn = {modifier(data.CHA)}/>
            <Skills 
                firstColumn = 'Skill name' 
                secondColumn = 'Total bonus' 
                thirdColumn = 'Ability mod' 
                fourthColumn = 'Ranks'
            />
            <Skills 
                firstColumn = 'Acrobatics' 
                secondColumn = {totalBonus(data.SKILL_RANKS_LIST[0], data.DEX)}
                thirdColumn = {modifier(data.DEX)} 
                fourthColumn = {data.SKILL_RANKS_LIST[0]}
            />
        </div>  
    )
}
