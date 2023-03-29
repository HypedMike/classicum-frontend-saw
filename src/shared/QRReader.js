import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import style from "../styles/qr.module.css";

export function QRReader(props){

    const [devices, setDevices] = useState([]);
    const [mainCamera, setMainCamera] = useState(null);

    const [html5QrCode, sethtml5QrCode] = useState();

    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        sethtml5QrCode(new Html5Qrcode("reader", false));

        Html5Qrcode.getCameras().then(devices => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
                setDevices(devices);
                setMainCamera(devices[0].id);
            }
        }).catch(err => {
            // handle err
        });
    }, [])

    const startScanning = () => {
        setScanning(true);
        html5QrCode.start(
            { facingMode: "environment" }, 
            {
              fps: 10,    // Optional, frame per seconds for qr code scanning
              qrbox: { width: 100, height: 100 }  // Optional, if you want bounded box UI
            },
            (decodedText, decodedResult) => {
              props.result(decodedText);
              stopScanning();
            },
            (errorMessage) => {
              // parse error, ignore it.
            })
          .catch((err) => {
            // Start failed, handle it.
          });
    }

    const stopScanning = () => {
        setScanning(false);
        html5QrCode.stop().then((ignore) => {
            console.log("finished scanning");
          })
    }

    return (
        <div >

            <div id="reader" width="700px">

            </div>

            <div className={style.body}>
                <div className={style.buttons}>
                    {
                        !scanning ? <button onClick={startScanning}>📹 Scan</button>
                            : <button onClick={stopScanning}>Stop</button>
                    
                    }
                </div>
            </div>
        </div>
    )
}