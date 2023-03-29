import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { PATH } from "enviroment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GuardSpinner } from "react-spinners-kit";
import style from "../../styles/admin.module.css";
import {init_admin, nullify} from "../../../slices/adminSlice";


export default function Login(props){

    const [loadingprogress, setLoadingprogress] = useState(false);

    const [cookieFound, setCookieFound] = useState(false);

    const ADMIN = useSelector((state) => state.admin.value);

    const [userinfo, setUserinfo] = useState({
        name: "admin",
        password: "admin"
    })

    const dispatch = useDispatch();

    const cookieCheck = () => {
        let cookie = document.cookie;
        if(cookie == "" || cookie == null){
            return false;
        }

        cookie = cookie.split(";");

        if(cookie.length < 1){
            return false;
        }

        cookie.forEach(element => {
            if(element.split("=").length > 1 && element.split("=")[0].trim() == "token"){
                setCookieFound(true);
                /*
                axios.post( PATH + "login", {
                    token: element.split("=")[1].trim()
                }).then((res) => {
                    if(res.data){
                        document.cookie = "token=" + res.data.token;
                        dispatch(init_admin(res.data));
                    }else{
                        document.cookie = "";
                    }
                    setCookieFound(false);
                })
                */

                // pretending to check for old session token
               setTimeout(() => {
                setCookieFound(false);
               }, 1000)
            }
        });
    }

    useEffect(() => {
        cookieCheck();
    }, [])

    const load = () => {
        setLoadingprogress(true);

        /*axios.post(PATH + "login", userinfo).then((res) => {
            if(res.data != false){
                console.log(res.data.token);
                document.cookie = "token=" + res.data.token;
                dispatch(init_admin(res.data))
            }
            setLoadingprogress(false);
        }).catch(() => {
            setLoadingprogress(false);
        })*/

        setTimeout(() => {
            document.cookie = "token=" + "faketoken";
            dispatch(init_admin({
                name: "admin",
                admin_level: 15,
                password: "admin",
                token: "faketoken"
            }))
            setLoadingprogress(false);
        }, 1000)

    }

    return (
        <Stack className={style.body} sx={{minHeight: "100vh"}} justifyContent="center" alignItems="center">
            <input disabled={cookieFound} value={userinfo.name} onChange={(e) => {setUserinfo({...userinfo, name: e.target.value})}} placeholder="Phone number" />
            <input disabled={cookieFound} value={userinfo.password} onChange={(e) => {setUserinfo({...userinfo, password: e.target.value})}} type={"password"} placeholder="Password" />
            <input disabled={cookieFound} className={style.butt} type="submit" value={"Login"} onClick={load} />
            {
                loadingprogress && <GuardSpinner />
            }
        </Stack>
    )
}