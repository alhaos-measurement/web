import styles from "./Main.module.css"
import Disk from "../Disc/Disk.jsx";

function Main() {
    return <div className={styles.container}>
        <Disk sensorID={1} measureTypeID={1}/>
        <Disk sensorID={1} measureTypeID={2}/>
    </div>
}

export default Main