import PropTypes from 'prop-types';
import styles from './Barometer.module.css';
import {useBarometerData} from '../../hooks/useBarometerData';
import {getDate, getTime} from "../../utils/dateTime.js";

const Barometer = ({sensorID, measureTypeID}) => {

    const {data, loading, error} = useBarometerData(sensorID, measureTypeID);

    // Состояния загрузки и ошибок
    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Загрузка барометра...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>Ошибка: {error}</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className={styles.container}>
                <div className={styles.noData}>Нет данных</div>
            </div>
        );
    }

    const minPressure = 730;
    const maxPressure = 765;
    const currentValue = data?.value || 760;

    // Вычисляем угол для стрелки
    const normalizedValue = Math.max(minPressure, Math.min(maxPressure, currentValue));
    const percentage = (normalizedValue - minPressure) / (maxPressure - minPressure)
    console.log("percentage: ", percentage)
    const needleAngle = -135 + (percentage * 270);

    return (
        <div className={styles.container}>
            <svg width="300" height="300" viewBox="0 0 300 300" className={styles.barometer}>
                {/* Круг барометра */}
                <circle cx="150" cy="150" r="145" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>

                {/* Деления шкалы */}
                {[...Array(36)].map((_, i) => {
                    const angle = -135 + 7.7 * i; // 270° / 36 = 7.5° каждое деление
                    const isMainMark = i % 5 === 0; // Каждое 3-е деление - основное
                    const length = isMainMark ? 20 : 10;

                    return (
                        <line
                            key={i}
                            x1="150"
                            y1="20"
                            x2="150"
                            y2={20 + length}
                            stroke="#333"
                            strokeWidth={isMainMark ? 2 : 1}
                            transform={`rotate(${angle} 150 150)`}
                        />
                    );
                })}

                {/* Цифры шкалы */}
                {[...Array(8)].map((_, i) => {
                    const angle = 135 + (38.5 * i); // 7 цифр
                    const value = minPressure + i * 5;
                    const radius = 90; // ← МЕНЯЕМ ЗДЕСЬ: было 110, стало 90 (ближе к центру)
                    const radian = (angle * Math.PI) / 180;
                    const x = 150 + Math.cos(radian) * radius;
                    const y = 150 + Math.sin(radian) * radius;

                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fontSize="12"
                            fontWeight="bold"
                            fill="#333"
                        >
                            {Math.round(value)}
                        </text>
                    );
                })}

                {/* Стрелка */}
                <g transform={`rotate(${needleAngle} 150 150)`}>
                    <polygon
                        points="150,30 145,140 155,140"
                        fill="#c0392b"
                        stroke="#333"
                        strokeWidth="1"
                    />
                </g>

                {/* Центральная ось */}
                <circle cx="150" cy="150" r="15" fill="#222c1a" stroke="#333" strokeWidth="2"/>

                <text x={150}
                      y={190}
                      textAnchor={"middle"}
                      fontSize="16"
                      fontWeight="bold"
                      fill="#333">{`${data.value.toFixed(2)} ${data.unitName}`}</text>

                <text x={150}
                      y={220}
                      textAnchor={"middle"}
                      fontSize="10"
                      fontWeight="bold"
                      fill="#333">{getDate(data.measuredAt)}</text>

                <text x={150}
                      y={235}
                      textAnchor={"middle"}
                      fontSize="10"
                      fontWeight="bold"
                      fill="#333">{getTime(data.measuredAt)}</text>
            </svg>
        </div>
    );
};

Barometer.propTypes = {
    sensorID: PropTypes.number,
    measureTypeID: PropTypes.number
};

export default Barometer;