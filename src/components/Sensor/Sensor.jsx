import styles from './Sensor.module.css'
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {formatDateTime} from "../../utils/dateTime.js";


function Sensor({sensorID, measureTypeID}) {

    let [value, setValue] = useState("loading...");
    let [caption, setCaption] = useState("loading...");
    let [timestamp, setTimestamp] = useState("loading...");


    useEffect(() => {
        fetch("/api/last-measure-by-id", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sensorID: sensorID,
                measureTypeID: measureTypeID
            })
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then((data) => {
                setValue(`${Math.round(data.value)} ${data.unitName}`)
                setCaption(data.measureName)
                const formattedDate = formatDateTime(data.measuredAt);
                setTimestamp(formattedDate)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.caption}>{caption}</div>
            <div className={styles.value}>{value}</div>
            <div className={styles.timestamp}>{timestamp}</div>
        </div>
    );
}

Sensor.propTypes = {
    sensorID: PropTypes.number.isRequired,
    measureTypeID: PropTypes.number.isRequired
}

export default Sensor;