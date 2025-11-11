export const sensorAPI = {
    async getLastMeasure(sensorID, measureTypeID) {
        const response = await fetch("/api/last-measure-by-id", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sensorID: sensorID,
                measureTypeID: measureTypeID
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    }
};