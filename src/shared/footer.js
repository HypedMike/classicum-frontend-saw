import { Button } from "@mui/material";
import style from "../styles/navbar.module.css";
import pck from "../../package.json";
import { useDispatch, useSelector } from "react-redux";
import { nullify } from "slices/adminSlice";
import { useEffect, useState } from "react";


export default function Footer(){


    const ADMIN = useSelector((state) => state.admin.value);
    const dispatch = useDispatch();

    return (
        <footer className={style.footer}>
            <div>
            This website was crafted with ❤️ by <a href="https://hypedmike.github.io/">Michele Saladino</a>
            </div>
            <div>
                {
                    ADMIN != null ?
                    <Button onClick={() => {
                        dispatch(nullify());
                        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        window.location.href = "/admin";
                    }}>🏃‍♂️</Button>
                    :
                    <Button onClick={() => {
                        window.location.href = "/admin"
                    }}>🔐</Button>
                }
            </div>
            <div>
                © CLASSICUM version - {pck.version}
            </div>
        </footer>
    )
}