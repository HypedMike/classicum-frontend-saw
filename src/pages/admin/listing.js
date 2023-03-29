import { Collapse, Stack } from "@mui/material";
import axios from "axios";
import { PATH } from "enviroment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MagicSpinner, WaveSpinner } from "react-spinners-kit";
import { TransitionGroup } from "react-transition-group";
import style from "../../styles/admin.module.css";



export default function Listing(props){

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [load, setLoad] = useState(false);

    const ADMIN = useSelector((state) => state.admin.value);

    const levenshteinDistance = (str1 = '', str2 = '') => {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
        const track = Array(str2.length + 1).fill(null).map(() =>
        Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i += 1) {
           track[0][i] = i;
        }
        for (let j = 0; j <= str2.length; j += 1) {
           track[j][0] = j;
        }
        for (let j = 1; j <= str2.length; j += 1) {
           for (let i = 1; i <= str1.length; i += 1) {
              const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
              track[j][i] = Math.min(
                 track[j][i - 1] + 1, // deletion
                 track[j - 1][i] + 1, // insertion
                 track[j - 1][i - 1] + indicator, // substitution
              );
           }
        }
        return track[str2.length][str1.length];
     };

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

    useEffect(() => {
        update()
    }, [])



    return (
        <>
        <input style={{
            padding: "10px",
            border: "none",
            backgroundColor: "black",
            color: "white",
            width: "100%",
            borderBottom: "solid white 1px"
        }} type={"text"} value={filter} onChange={(e) => {setFilter(e.target.value)}}></input>
        <Stack alignItems="center" style={{minHeight: "100vh", margin: "10px"}}>

            {
                load && <MagicSpinner size={100}  />
            }
            <TransitionGroup sx={{minHeight: "100vh", margin: "10px", width: "100%"}}>
            {
                users.length > 0 && filter != "" ?
                users.filter((a) => {
                    return Math.min(levenshteinDistance(a.name, filter), levenshteinDistance(a.name + " " + a.surname, filter), levenshteinDistance(a.surname, filter)) < 3
                }).map((elem, index) => {
                    return (
                        <Collapse key={index}>
                            <InfoCard key={elem.id} user = {elem} token={ADMIN.token} />
                        </Collapse>
                    )
                })
                :
                null
            }
            </TransitionGroup>
        </Stack>
        </>
    )
}

function InfoCard(props){

    const [load, setLoad] = useState(false);

    const calculateAge = (birthday) => {
        birthday = new Date(birthday);
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }

    const [user, setUser] = useState(props.user);

    const update = () => {  

        // qui viene richiesto di aggiornare l'utente tramite server per essere sicuri che l'aggiornamento abbia avuto successo

        axios.post(PATH + "userbyid", {
            token: props.token,
            id: props.user.id
        }).then((res) => {
            if(res.data == false){
                alert("Something is wrong with your token, try to log out and log in again")
            }
            if(res.data.length == 1){
                setUser(res.data[0])
            }
            setLoad(false);
        }).catch((e) => {
            console.log(e)
            setLoad(false);
        })
    }

    return (
        <article className={style.card}>
            <h3>
                {user.name.toUpperCase() + " " + user.surname.toUpperCase() + (user.vip ? " 👑" : "")}
            </h3>
            <div>
                <table>
                    <tr>
                        <td>ID:</td>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <td>Age:</td>
                        <td>{calculateAge(user.birthday)}</td>
                    </tr>
                    <tr>
                        <td>Drinks:</td>
                        <td>{user.drinks}</td>
                    </tr>
                    <tr>
                        <td>Signed:</td>
                        <td>{user.signed == 0 ? "No" : "Yes"}</td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td>{user.gender == 0 ? "Femmina" : "Maschio"}</td>
                    </tr>
                    <tr>
                        <td>Pr:</td>
                        <td>{user.pr}</td>
                    </tr>
                </table>
                {
                    load ?
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                    }}>
                        <WaveSpinner />
                    </div>
                    :
                    <button onClick={() => {
                        setLoad(true);

                        setTimeout(() => {
                            setLoad(false);
                            console.log(user);
                            setUser({
                                ...user,
                                signed: user.signed == 0 ? 1 : 0
                            })
                        }, Math.random()*2000);

                    }}>{user.signed == 0 ? "Sign in" : "Sign out"}</button>
                }
            </div>
        </article>
    )
}