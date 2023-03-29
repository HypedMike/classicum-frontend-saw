import { Button, Skeleton, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import style from "../../styles/admin.module.css";
import {Html5QrcodeScanner} from "html5-qrcode"
import { PATH } from "enviroment";
import axios from "axios";
import { SwishSpinner } from "react-spinners-kit";
import { QRReader } from "@/shared/QRReader";
import { useSelector } from "react-redux";


export default function PourDrink(props){

    const [loadingprogress, setLoadingprogress] = useState(0);
    const [inputID, setInputID] = useState("");
    const [user, setUser] = useState("");

    const ADMIN = useSelector((state) => state.admin.value);

    const calculateAge = (birthday) => {
        birthday = new Date(birthday);
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }


      function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }

    const send = (id) => {
        if(!isNumeric(id)){
            return;
        }
        setLoadingprogress(true);
        axios.get("fakedatabase/guests.json", {
            token: ADMIN.token
        }).then((res) => {
            setLoadingprogress(true);
            setTimeout(() => {
                res.data.forEach(element => {
                    if(element.id == id){
                        setUser(element);
                    }
                });
                setLoadingprogress(false);
            }, 1000);
        }).catch((e) => {
            console.log(e)
            setLoadingprogress(false);
        })
    }

    useEffect(() => {
        if(isNumeric(inputID)){
            send(inputID);
        }
    }, [inputID])

    const drinkMore = () => {
        if(user.drinks > 3){
            if(!confirm("Questa persona ha già comprato " + user.drinks + " unità di alcolici, procedere alla vendita di un'altra unità?")){
                return false;
            }
        }
        setLoadingprogress(true);
        
        /*axios.post(PATH + "pourGlass", {
            id: user.id,
            units: user.drinks + 1,
            token: ADMIN.token
        }).then((res) => {
            if(res.data.rowCount == 1){
                setUser({...user, drinks: user.drinks + 1});
            }
            setLoadingprogress(false);
        })*/

        setTimeout(() => {
            setUser({
                ...user,
                drinks: user.drinks + 1
            })
            setLoadingprogress(false);
        }, 500)

    }

    return (
        <Stack className={style.body} sx={{minHeight: "100vh"}} justifyContent="center" alignItems="center">
            <input value={inputID} onChange={(e) => {setInputID(e.target.value)}} placeholder="Code" />
            <button className={style.butt} onClick={() => {send(inputID)}}>Send</button>
            <QRReader result={setInputID}/>
            <div className={style.userInfo}>
                {
                    loadingprogress ?
                    <SwishSpinner /> :
                    (
                        user != "" &&
                        <>
                        <div>{user.name + " " + user.surname}</div>
                        <div>
                            Age: {calculateAge(user.birthday)}
                        </div>
                        <div>
                            🍷: {user.drinks}
                        </div>
                        <button onClick={drinkMore}>🫗</button>
                        </>
                    )
                }
            </div>
        </Stack>
    )
}