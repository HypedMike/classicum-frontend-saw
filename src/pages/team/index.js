import style from "../../styles/team.module.css";

export default function Team(props){
    return (
        <div className={style.body}>
            <h1>
                Orari organizzazione, direzione e cancelleria
            </h1>
            <div className={style.table}>
                <div>martedì</div>
                <div>14:00/15:00</div>
                <div>mercoledì</div>
                <div>15:00/16:00</div>
                <div>venerdì</div>
                <div>15:00/17:00</div>
                <div>sabato</div>
                <div>16:00/18:00</div>
            </div>
            <h1>Contatti utili</h1>

            <div className={style.table}>
                <div>direzione:</div>
                <div>direzione@classicumeventi.com</div>
                <div>cancelleria:</div>
                <div>cancelleria@classicumeventi.com</div>
                <div>email ufficiale:</div>
                <div>info@classicumeventi.com</div>
                <div>pec:</div>
                <div>classicumeventi@pec.it</div>
                <div>Contatti telefonici</div>
                <div>
                    <ul>
                        <li>
                            +39 351 829 5699
                        </li>
                        <li>
                            +39 334 913 6981
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}