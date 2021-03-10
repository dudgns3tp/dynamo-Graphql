import dayjs from 'dayjs';

const dateNow = function (plusHour) {
    const hour = plusHour || 0;
    return dayjs(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
        .add(hour, 'h')
        .format('YYYY-MM-DD HH:mm:ss');
};

export { dateNow };
