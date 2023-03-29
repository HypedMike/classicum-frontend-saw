import axios from "axios";
import { PATH } from "enviroment";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

export default function RolesManagment(){

    const [admins, setAdmins] = useState([]);

    const ADMIN = useSelector((state) => state.admin.value);


    useEffect(() => {
        /*axios.post(PATH + "admin/getadmins/", {
            admin: ADMIN
        }).then((res) => {
            if(res != false){
                setAdmins(res.data.sort((a, b) => a.id - b.id));
            }
            console.log(res.data);
        })*/

        axios.get("/fakedatabase/admins.json", {
            admin: ADMIN
        }).then((res) => {
            if(res != false){
                setAdmins(res.data.sort((a, b) => a.id - b.id));
            }
            console.log(res.data);
        })

    }, [])

    return (
        <div style={{
            minHeight: "90vh"
        }}>
            {
                admins.length > 0 && admins.map((elem, index) => {
                    return <AdminCard auth={ADMIN} admin={elem} key={index} />
                })
            }
        </div>
    )
} 

function AdminCard(props){

    const [admin, setAdmin] = useState(props.admin);
    const [changed, setChanged] = useState(false);

    const s = {
        border: "solid white 1px",
        margin: "10px",
        padding: "10px",
    }

    const createDropdown = () => {
        var res = [];
        for(let i = 0; i < 16; i++){
            res.push(<option value={i}>{i}</option>);
        }
        return res;
    }

    const updateAdmin = () => {
        /*axios.post(PATH + "admin/updateadmin", {
            admin: props.auth,
            new_admin: admin
        }).then((res) => {
            if(res.data.rowCount != undefined && res.data.rowCount == 1){
                setChanged(false);
            }
        })*/

        alert("Saved");
        setChanged(false);
    }

    return (
        <div style={s}>
            <div>
                {admin.id}
            </div>
            <div>
                <input value={admin.name + " " + admin.surname} onChange={(e) => {
                    setChanged(true);
                    setAdmin({
                        ...admin,
                        name: e.target.value.split(" ")[0],
                        surname: e.target.value.split(" ")[1]
                    })
                }}></input>
            </div>
            <div>
                <input value={admin.password} type={"password"} onChange={(e) => {
                    setChanged(true);
                    setAdmin({
                        ...admin,
                        password: e.target.value
                    })
                }}></input>
            </div>
            <div>
            <select defaultValue={admin.admin_level} onChange={(e) => {
                    setChanged(true);
                    setAdmin({
                        ...admin,
                        admin_level: e.target.value
                    })}}>
                {createDropdown()}
            </select>
            </div>
            {
                changed
                &&
                <button onClick={() => {
                    updateAdmin()
                }}>Save</button>
            }
        </div>
    )
}