import { useState } from "react"
import style from "../../styles/registeruser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Spinner } from "@nextui-org/react";
import axios from "axios";
import { PATH } from "enviroment";
import { SwishSpinner } from "react-spinners-kit";

export default function RegisterUser(props){

    const dispatch = useDispatch();

    const ADMIN = useSelector((state) => state.admin.value);

    const [user, setUser] = useState({
        name: "",
        surname: "",
        phonenumber: "",
        birthday: "",
        vip: false,
        gender: 0,
    });

    const formatText = (s) => {
        return s.replace(/'/g, "\\'");
    }

    const [loading, setLoading] = useState(false);

    const send = () => {

        if(user == null){
            return;
        }

        if(user.name == undefined || user.surname == undefined || user.birthday == undefined){
            alert("Missing fields");
            return;
        }

        if(user.name == "" || user.surname == "" || user.birthday == ""){
            alert("Missing fields");
            return;
        }

        console.log(user);

        setLoading(true);


        /*axios.post(PATH + "register", {
            user: user,
            admin: ADMIN
        }).then((res) => {
            if(res.data){
                alert("Success");
            }else{
                alert("Something went wrong!");
            }
            setLoading(false);
        }).catch(() => {
            alert("Something went wrong!");
            setLoading(false);
        })*/

        alert("Success!");

        return 0;
    }

    return (
        <div>
            <h1>
                Register user 
            </h1>
            <div className={style.form}>

                <input placeholder="Name" value={user.name} onChange={(e) => setUser({...user, name: formatText(e.target.value)})} />
                <input placeholder="Surname" value={user.surname} onChange={(e) => setUser({...user, surname: formatText(e.target.value)})} />
                <input placeholder="Birthday" type={"date"} value={user.birthday} onChange={(e) => setUser({...user, birthday: e.target.value})} />
                <Checkbox size="lg" value={user.vip} labelColor={user.vip ? "success" : "error"} color={user.vip ? "success" : "error"} onChange={(e) => setUser({
                    ...user,
                    vip: !user.vip
                })}>VIP</Checkbox>
                <button onClick={(e) => setUser({
                    ...user,
                    gender: user.gender == 0 ? 1 : 0
                })}>
                    {user.gender == 0 ? "Female" : "Male"} (press to change)
                </button>
                {
                    loading ?
                    <SwishSpinner />    
                    :
                    <input type={"submit"} value="Send" onClick={send}/>
                }
            </div>
        </div>
    )
}