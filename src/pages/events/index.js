import { EventCard } from "@/shared/eventcard"
import axios from "axios";
import { PATH } from "enviroment";
import { useEffect, useState } from "react"
import style from "../../styles/eventslideshow.module.css";
import { TransitionGroup } from "react-transition-group";
import { Collapse } from "@mui/material";
import Head from "next/head";
import { MagicSpinner } from "react-spinners-kit";

export default function Events(props){

    const [events, setEvents] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true);
        axios.get(PATH + "eventslist").then((res) => {
            setEvents(res.data);
            setLoad(false);
        }).catch((e) => {
            alert("Server not available")
            setLoad(false);
        });
    }, [])

    return (
        <>
            <Head>
                <title>Events</title>
            </Head>
            <div className={style.body}>
            <h1>Upcoming events</h1>
            {
                load ? 
                <div className={style.loader}>
                    <MagicSpinner />
                </div>
                :
                <TransitionGroup className={style.slideshow}>
                {   
                    events.length && events.filter((a) => a.visible == 1 && Date.parse(a.date) >= Date.now()).length > 0 ? events.filter((a) => a.visible == 1 && Date.parse(a.date) >= Date.now()).map((elem, index) => {
                        console.log(Date.now() + " " + Date.parse(elem.date) + " " + (Date.parse(elem.date) >= Date.now()))
                        
                        if(elem.visible == 0){
                            return null;
                        }

                        return (
                            <Collapse key={elem.id}  timeout={1000*Math.random(1,3)}>
                                <EventCard event={elem} key={elem.id}/>
                            </Collapse>
                        )
                    })
                    
                    :

                    <div>Sembra che non ci siano eventi al momento</div> 
                }
            </TransitionGroup>
            }
            <h1>Late events</h1>
            {
                load ? 
                <div className={style.loader}>
                    <MagicSpinner />
                </div>
                :
                <TransitionGroup className={style.slideshow}>
                {   
                    events.length && events.filter((a) => Date.parse(a.date) < Date.now()).length > 0 ? events.filter((a) => a.visible == 1 && Date.parse(a.date) < Date.now()).sort(
                        (a, b) => {
                            return - Date.parse(a.date) + Date.parse(b.date)
                        }
                    ).map((elem, index) => {

                        if(elem.visible == 0){
                            return null;
                        }

                        return (
                            <Collapse key={elem.id}  timeout={1000*Math.random(1,3)}>
                                <EventCard event={elem} key={elem.id}/>
                            </Collapse>
                        )
                    })
                    
                    :

                    <div>Sembra che non ci siano eventi al momento</div> 
                }
            </TransitionGroup>
            }
        </div>
        </>
    )
}