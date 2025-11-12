import {useEffect, useState} from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const PressureChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPressureData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/avg-pressure-hourly');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const pressureData = await response.json();

                const chartData = pressureData.map(item => ({
                    time: new Date(item.start).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    pressure: Math.round(item.value * 100) / 100,
                    fullDate: new Date(item.start).toLocaleString('ru-RU'),
                    rawValue: item.value
                })).reverse();

                setData(chartData);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Ошибка загрузки данных:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPressureData();
    }, []);

    if (loading) {
        return (
            <div style={{
                width: '100%',
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f5f5f5',
                borderRadius: 8
            }}>
                <div>Загрузка данных с барометра...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                width: '100%',
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff0f0',
                borderRadius: 8,
                color: '#d00'
            }}>
                <div>
                    <strong>Ошибка загрузки:</strong><br/>
                    {error}
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div style={{
                width: '100%',
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f5f5f5',
                borderRadius: 8
            }}>
                <div>Нет данных для отображения</div>
            </div>
        );
    }

    return (
        <div style={{width: '100%', height: 450, padding: '10px 0'}}>
            <h3 style={{
                textAlign: 'center',
                marginBottom: 25,
                color: '#ffffff',
                fontSize: '1.5rem',
                fontWeight: '600'
            }}>
                График атмосферного давления
            </h3>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart
                    data={data}
                    margin={{top: 10, right: 30, left: 20, bottom: 30}} // Увеличил нижний отступ
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#8a9a96" opacity={0.3}/>
                    <XAxis
                        dataKey="time"
                        label={{
                            value: 'Время',
                            position: 'insideBottom',
                            offset: -15,
                            fill: '#ffffff',
                            fontSize: 12,
                            fontWeight: '500'
                        }}
                        tick={{
                            fill: '#ffffff',
                            fontSize: 11,
                            fontWeight: '500'
                        }}
                        axisLine={{stroke: '#ffffff'}}
                        tickLine={{stroke: '#ffffff'}}
                    />
                    <YAxis
                        label={{
                            value: 'Давление (мм рт.ст.)',
                            angle: -90,
                            position: 'insideLeft',
                            offset: -10,
                            fill: '#ffffff',
                            fontSize: 12,
                            fontWeight: '500'
                        }}
                        domain={['dataMin - 0.5', 'dataMax + 0.5']}
                        tick={{
                            fill: '#ffffff',
                            fontSize: 11,
                            fontWeight: '500'
                        }}
                        axisLine={{stroke: '#ffffff'}}
                        tickLine={{stroke: '#ffffff'}}
                    />
                    <Tooltip
                        formatter={(value) => [`${value} мм рт.ст.`, 'Давление']}
                        labelFormatter={(label, payload) => {
                            if (payload && payload[0]) {
                                return payload[0].payload.fullDate;
                            }
                            return label;
                        }}
                        contentStyle={{
                            backgroundColor: '#2d3a36',
                            border: '1px solid #4a5a55',
                            borderRadius: 8,
                            color: '#ffffff'
                        }}
                        itemStyle={{color: '#8884d8'}}
                    />
                    <Line
                        type="monotone"
                        dataKey="pressure"
                        stroke="#8884d8"
                        strokeWidth={3}
                        dot={{fill: '#8884d8', strokeWidth: 2, r: 4}}
                        activeDot={{r: 6, fill: '#ff7300'}}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PressureChart;