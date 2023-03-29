import axios from "axios";
import { PATH } from "enviroment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import  style from "../../styles/statistics.module.css";

export default function Statistics(){

    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);

    const ADMIN = useSelector((state) => state.admin.value);

    useEffect(() => {
        update();
    }, [])

    const update = () => {  
        setLoad(true);
        axios.get("fakedatabase/guests.json", {
            token: ADMIN.token
        }).then((res) => {
            setLoad(false);
            setUsers(res.data);
        }).catch((e) => {
            console.log(e)
            setLoad(false);
        })
     }

    return (
        <div className={style.main}>
            <h1>Statistics</h1>
            <button onClick={update}>Update</button>
            <div className={style.body}>
            <label>
                Signed people: {users.filter((a) => a.signed == 1).length} / {users.length}
                <progress value={users.filter((a) => a.signed == 1).length} max={users.length}></progress>
            </label>
            <label>
                Vips: {users.filter((a) => {
                    if(a.signed == 1){
                        if(a.vip){
                            return true;
                        }
                        return false;
                    }
                }).length} / {users.filter((a) => a.vip).length}
                <progress value={users.filter((a) => {
                    if(a.signed == 1){
                        if(a.vip){
                            return true;
                        }
                        return false;
                    }
                }).length} max={users.filter((a) => a.vip).length}></progress>
            </label>
            <label>
                Total gender percentage (male / female): {users.filter((a) => {
                    if(a.gender == 1){
                        return true;
                    }
                }).length} / {users.length}
                <progress value={users.filter((a) => {
                        if(a.gender == 1){
                            return true;
                        }
                }).length} max={users.length}></progress>
            </label>
            </div>
        </div>
    )
}