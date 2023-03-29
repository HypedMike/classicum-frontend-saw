import { Collapse } from "@mui/material";
import { useRouter } from "next/router"
import Script from "next/script";
import { useEffect, useState } from "react";
import style from "../../../styles/eventphotos.module.css";

export default function EmbedPhotos(props){

    const router = useRouter();
    const {pid} = router.query;

    useEffect(() => {
            // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://classicum.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
    }, [])

    return (
        <div className={style.body}>
            <iframe className={style.frame} src={"https://drive.google.com/embeddedfolderview?id=" + pid + "#grid"} width="600" height="500" frameborder="0"></iframe>
            <div className={style.comments} id="disqus_thread"></div>
        </div>
    )
}