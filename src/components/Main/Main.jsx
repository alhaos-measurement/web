import styles from "./Main.module.css"
import Disk from "../Disc/Disk.jsx";

function Main() {
    return <div className={styles.container}>
        <Disk/>
    </div>
}

export default Main