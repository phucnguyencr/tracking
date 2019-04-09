import { isEmpty, isObject } from 'lodash';

export function convertDateObjToString(dateObj) {
    return `${dateObj.year}-${dateObj.month}-${dateObj.day}T00:00:00Z`;
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