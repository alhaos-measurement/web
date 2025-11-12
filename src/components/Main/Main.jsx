import styles from "./Main.module.css"
import Barometer from "../barometer/Barometer.jsx";
import PressureChart from "../PressureChart/PressureChart.jsx";

function Main() {
    return <div className={styles.container}>
        <Barometer
            sensorID={1}
            measureTypeID={1}
        />
        <PressureChart/>
    </div>
}

export default Main