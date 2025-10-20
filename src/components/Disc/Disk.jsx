import styles from './Disk.module.css'
import {useEffect, useState} from "react";

function Disk() {

    let [value, setValue] = useState("n/a");

    useEffect(() => {
        fetch("/api/last-measure-by-id", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sensorID: 1,
            })
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then((data) => {
                setValue(Math.round(data.value));
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