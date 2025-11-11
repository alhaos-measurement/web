import {useEffect, useState} from 'react';
import {sensorAPI} from '../services/sensorService';

export const useBarometerData = (sensorID, measureTypeID) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const sensorData = await sensorAPI.getLastMeasure(sensorID, measureTypeID);
                setData(sensorData);
            } catch (err) {
                setError(err.message);
                console.error('Barometer data error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sensorID, measureTypeID]);

    return {data, loading, error};
};