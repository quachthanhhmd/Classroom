// export const formatDate = (date: Date | undefined) => {
//     if (!date) return undefined;

//     let month = '' + (date.getMonth() + 1);
//     let day = '' + date.getDate();
//     let year = date.getFullYear();

//     if (month.length < 2)
//         month = '0' + month;
//     if (day.length < 2)
//         day = '0' + day;

//     return [year, month, day].join('-');
// }

export const getDateFormat = (date: Date) => {
    const newDate = new Date(date);
    if (sameDay(newDate, new Date())) {
        return `${`0${newDate.getHours()}`.substr(-2)}: ${`0${newDate.getMinutes()}`.substr(-2)}`
    }
    return `${newDate.getDay()} thg ${newDate.getMonth()}`;
}


export const sameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

export const isRatherZero = (n: string) => {
    if (Number(n) && Number(n) > 0) return true;
    return false;
}