import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import style from "../../styles/admin.module.css";
import axios from "axios";
import { PATH } from "enviroment";
import { SwishSpinner } from "react-spinners-kit";
import { QRReader } from "@/shared/QRReader";
import { useSelector } from "react-redux";


export default function USerSignIn(props){

    const [loadingprogress, setLoadingprogress] = useState(0);
    const [user, setUser] = useState("");
    const [code, setCode] = useState("");

    const ADMIN = useSelector((state) => state.admin.value);

    function isNumeric(str) {
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }
      

      const calculateAge = (birthday) => {
        birthday = new Date(birthday);
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }

    const signin = (id) => {
        setUser({
            ...user,
            signed: user.signed == 0 ? 1 : 0
        })
    }

    const send = (id) => {
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
        if(isNumeric(code)){
            send(code);
        }
    }, [code])

    return (
        <Stack className={style.body} sx={{minHeight: "100vh"}} justifyContent="center" alignItems="center">
            <input placeholder="Code" value={code} onChange={(e) => {setCode(e.target.value)}} />
            <QRReader result={setCode} />
            <button className={style.butt} onClick={send}>Send</button>
            <div className={style.userInfo} style={{borderColor: user.gender == 1 ? "blue" : "pink"}}>
                {
                    loadingprogress ?
                    <SwishSpinner /> :
                    (
                        user != "" &&
                        <>
                        <div>{user.name + " " + user.surname}</div>
                        {
                            user.vip && <div>👑</div>
                        }
                        <div>
                            Age: {calculateAge(user.birthday)}
                        </div>
                        <div>
                            🍷: {user.drinks}
                        </div>
                        <button onClick={signin}>{user.signed == 1 ? "Sign out" : "Sign in"}</button>
                        </>
                    )
                }
            </div>
        </Stack>
    )
}