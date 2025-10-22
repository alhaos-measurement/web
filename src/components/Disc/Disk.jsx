import styles from './Disk.module.css'
import {useEffect, useState} from "react";

function Disk() {

    let [pressureValue, setPressureValue] = useState("load...");
    let [temperatureValue, setTemperatureValue] = useState("load...");

    useEffect(() => {
        fetch("/api/last-measure-by-id", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sensorID: 1,
                measureTypeID: 1
            })
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then((data) => {
                setPressureValue(Math.round(data.value));
            })
            .catch((err) => {
                console.log(err);
            });

        fetch("/api/last-measure-by-id", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sensorID: 1,
                measureTypeID: 2
            })
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then((data) => {
                setTemperatureValue(Math.round(data.value));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className={styles.container}>{pressureValue}</div>
            <div className={styles.container}>{temperatureValue}</div>
        </>
    );
}

export default Disk;