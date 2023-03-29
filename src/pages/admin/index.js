import { useEffect, useState } from "react";
import Login from "./login";
import USerSignIn from "./usersignin";
import style from "../../styles/admin.module.css";
import PourDrink from "./pourdrink";
import Listing from "./listing";
import { useSelector } from "react-redux";
import RegisterUser from "./registeruser";
import RolesManagment from "./rolesmangment";
import Statistics from "./statistics";

export default function Admin(props){

    const [token, setToken] = useState(false);
    const [page, setPage] = useState("login");

    const ADMIN = useSelector((state) => state.admin.value);

    useEffect(() => {
        console.log("Something changed in the admin");
        if(ADMIN != null && ADMIN.token != null){
            console.log("admin changed");
            setPage("usersignin");
        }
    }, [ADMIN])

    return (
        <div>
            {
                ADMIN && (
                    <nav className={style.nav}>
                        <button style={{backgroundColor: page == "usersignin" ? "white" : "black", color: page == "usersignin" ? "black" : "white"}} onClick={() => setPage("usersignin")}>Sign users</button>
                        <button style={{backgroundColor: page == "pourdrink" ? "white" : "black", color: page == "pourdrink" ? "black" : "white"}} onClick={() => setPage("pourdrink")}>Pour drink</button>
                        <button style={{backgroundColor: page == "listing" ? "white" : "black", color: page == "listing" ? "black" : "white"}} onClick={() => setPage("listing")}>List</button>
                        {
                            ADMIN.admin_level > 5 &&
                            <>
                            <button style={{backgroundColor: page == "register" ? "white" : "black", color: page == "register" ? "black" : "white"}} onClick={() => setPage("register")}>Register</button>
                            <button style={{backgroundColor: page == "stats" ? "white" : "black", color: page == "stats" ? "black" : "white"}} onClick={() => setPage("stats")}>Statistics</button>
                            </>
                        }
                        {
                            ADMIN.admin_level > 9 &&
                            <>
                            <button style={{backgroundColor: page == "rolemanagment" ? "white" : "black", color: page == "rolemanagment" ? "black" : "white"}} onClick={() => setPage("rolemanagment")}>Roles</button>
                            </>
                        }
                    </nav>
                )
            }
            {page == "login" ? <Login setToken={setToken} /> : null }
            {page == "usersignin" ? <USerSignIn token={token} /> : null }
            {page == "pourdrink" ? <PourDrink token={token} /> : null }
            {page == "listing" ? <Listing token={token} /> : null }
            {page == "register" ? <RegisterUser token={token} /> : null }
            {page == "rolemanagment" ? <RolesManagment token={token} /> : null }
            {page == "stats" ? <Statistics token={token} /> : null }
        </div>
    )
}