import styles from "./Main.module.css"
import Barometer from "../barometer/Barometer.jsx";

function Main() {
    return <div className={styles.container}>
        <Barometer
            sensorID={1}
            measureTypeID={1}
        />
    </div>
}

export default Main