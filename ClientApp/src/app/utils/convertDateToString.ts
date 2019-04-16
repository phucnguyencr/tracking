import { isEmpty, isObject } from 'lodash';

export function convertDateObjToString(dateObj) {
    if (isEmpty(dateObj)) return '';
    const m = dateObj.month < 10 ? `0${dateObj.month}` : dateObj.month;
    const d = dateObj.day < 10 ? `0${dateObj.day}` : dateObj.day;
    return `${dateObj.year}-${m}-${d} 00:00:00`;
}

export function compareDateObj(dateObj1, dateObj2) {
    if (isEmpty(dateObj1) && isEmpty(dateObj2)) return true;
    if (isEmpty(dateObj1) && isObject(dateObj2)) return false;
    if (isObject(dateObj1) && isEmpty(dateObj2)) return false;
    if (dateObj1.year > dateObj2.year) return false;
    if (dateObj1.year === dateObj2.year && dateObj1.month > dateObj2.month) return false;
    if (dateObj1.year === dateObj2.year && dateObj1.month === dateObj2.month && dateObj1.day > dateObj2.day) return false;
    return true;
}

export function convertDateToObject(dateObj) {
    if (isEmpty(dateObj)) return '';
    const newDate = new Date(dateObj);
    return { year: newDate.getFullYear(), month: newDate.getMonth() + 1, day: newDate.getDate() };;
}