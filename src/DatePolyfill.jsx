
export function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}

export function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
}

export function addHours(date, hours) {
    date.setHours(date.getHours() + hours);
    return date;
}
