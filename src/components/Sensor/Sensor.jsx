import styles from './Sensor.module.css'
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

function Sensor({sensorID, measureTypeID}) {

    let [value, setValue] = useState("loading...");
    let [caption, setCaption] = useState("loading...");


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
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <p>{caption}</p>
            <div className={styles.container}>{value}</div>
        </>
    );
}

Sensor.propTypes = {
    sensorID: PropTypes.number.isRequired,
    measureTypeID: PropTypes.number.isRequired
}

export default Sensor;