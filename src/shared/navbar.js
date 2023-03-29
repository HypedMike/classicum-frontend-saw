import { Collapse, Slide } from "@mui/material";
import { useEffect, useState } from "react";
import style from "../styles/navbar.module.css";
import {BiDownArrow} from "react-icons/bi";
import {motion} from "framer-motion"
import Image from "next/image";

export default function Navbar(props){

    const goto = (direction) => {
        window.location.href = direction; 
    }

    const [width, setWidth] = useState(null);
    const [buttonsVisible, setButtonsVisible] = useState(false);

    const [iconRotation, setIconRotation] = useState(false);


    useEffect(() => {
        setWidth(window.innerWidth);
        if(window.innerWidth < 800){
            setButtonsVisible(false);
        }
    }, [])

    const variants = {
        selected: {transform: "rotate(180deg)"},
        unselected: {transform: "rotate(0deg)"},
    }


    if(width <= 800){
        return (
            <div className={style.navbar}>
            <div>
                <div className={style.title} >
                    <button onClick={() => {goto("/")}}>
                        <Image src="/assets/logononame.png" alt="logo" width={"50"} height="50"/>
                    </button>
                    <motion.div
                        animate={iconRotation ? "selected" : "unselected"}
                        variants={variants}
                    >
                        <BiDownArrow onClick={() => {setButtonsVisible(!buttonsVisible);setIconRotation(!iconRotation)}}/>
                    </motion.div>
                </div>
            </div>
            {
                <Collapse in={buttonsVisible}>
                <div className={style.buttons}>
                    <button onClick={() => {goto("/events")}}>
                        EVENTS
                    </button>
                    <button onClick={() => {goto("/team")}}>
                        ORGANIZATION
                    </button>
                    <button onClick={() => {goto("/about")}}>
                        ABOUT
                    </button>
                </div>
                </Collapse>
            }
        </div>
        )
    }



    return (
        <div className={style.navbar}>
            <div>
                <div  style={{fontFamily: "'Times New Roman', Courier, monospace"}} onClick={() => {goto("/")}}>
                    Classicum
                </div>
            </div>
            <div className={style.buttons}>
                <button onClick={() => {goto("/events")}}>
                    EVENTS
                </button>
                <button onClick={() => {goto("/team")}}>
                    ORGANIZATION
                </button>
                <button onClick={() => {goto("/about")}}>
                    ABOUT
                </button>
            </div>
        </div>
    )
}