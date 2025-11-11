export const sensorAPI = {
    async getLastMeasure(sensorID, measureTypeID) {
        const requestBody = {
            sensorID: sensorID,           // с большой D
            measureTypeId: measureTypeID  // с маленькой d! ← ИСПРАВЛЕНИЕ
        };

        console.log('🔍 Отправляем запрос:');
        console.log('URL:', '/api/last-measure-by-id');
        console.log('Данные:', JSON.stringify(requestBody, null, 2));

        try {
            const response = await fetch("/api/last-measure-by-id", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            console.log('📡 Ответ сервера:');
            console.log('Status:', response.status);
            console.log('Status Text:', response.statusText);

            if (!response.ok) {
                const errorText = await response.text();
                console.log('Текст ошибки:', errorText);
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ Получены данные:', data);
            return data;

        } catch (error) {
            console.error('❌ Ошибка fetch:', error);
            throw error;
        }
    }
};