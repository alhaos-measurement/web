import styles from "./Main.module.css"
import Barometer from "../barometer/Barometer.jsx";

function Main() {

    const barometerData = {
        "sensorName": "BPM280",
        "measureName": "Pressure",
        "unitName": "mmHg",
        "value": 750,
        "measuredAt": "2025-11-10T18:58:27.756+05:00"
    };

    return <div className={styles.container}>
        {/*<Sensor sensorID={1} measureTypeID={1}/>*/}
        <Barometer data={barometerData}/>
    </div>
}

export default Main