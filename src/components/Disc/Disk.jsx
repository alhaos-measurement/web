import styles from './Disk.module.css'
import {useEffect, useState} from "react";

function Disk() {

    let [value, setValue] = useState("n/a");

    useEffect(() => {
        fetch("/api/measure")
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json(); // исправлено: json() вместо JSON()
            })
            .then((data) => {
                setValue(data.value); // или data, в зависимости от структуры ответа
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={styles.container}>{value}</div>
    );
}

export default Disk;