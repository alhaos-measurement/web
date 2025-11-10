// utils/dateFormatter.js
export const formatDateTime = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    // Проверка валидности даты
    if (isNaN(date.getTime())) return 'Неверная дата';

    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year}г ${hours}:${minutes}`;
};
