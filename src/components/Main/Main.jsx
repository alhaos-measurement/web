import styles from "./Main.module.css"
import Sensor from "../Sensor/Sensor.jsx";

function Main() {
    return <div className={styles.container}>
        <Sensor sensorID={1} measureTypeID={1}/>
        <Sensor sensorID={1} measureTypeID={2}/>
    </div>
}

export default Main