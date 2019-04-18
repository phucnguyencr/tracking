import { filter, size } from 'lodash';
import * as Case from 'case';

export function getValidationErrors(anyForm) {
    const arr = [];
    Object.keys(anyForm.controls).forEach(key => {
        const controlErrors = anyForm.get(key).errors;
        if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
                arr.push(
                        {
                            key,
                            keyError,
                            errValue: controlErrors[keyError]
                        }
                );
            });
        }
    });
    return arr;
}

export function hasInvalidRequire(anyErrors) {
    const requiredErrors = filter(anyErrors,  { 'keyError': 'required', 'errValue': true });
    return requiredErrors.length > 0;
}

export function hasInvalidLength(anyErrors) {
    const lengthErrors = filter(anyErrors,  function(o) { return o.keyError === 'maxlength' || 'minlength'; });
    return lengthErrors.length > 0;
}

export function hasInvalidPattern(anyErrors) {
    const patternErrors = filter(anyErrors,  { 'keyError': 'pattern' });
    return patternErrors.length > 0;
}

export function listInvalidLength(anyErrors) {
    const arrMax = filter(anyErrors, { 'keyError': 'maxlength' });
    const arrMin = filter(anyErrors, { 'keyError': 'minlength' });
    const arr = arrMax.concat(arrMin);
    if (size(arr) === 0) return [];
    return arr.map((item) => {
        return ` ${Case.sentence(item.key)} - ${item.keyError}: ${item.errValue.requiredLength}`
    });
}

export function listInvalidRange(anyErrors) {
    const arrMax = filter(anyErrors, { 'keyError': 'max' });
    const arrMin = filter(anyErrors, { 'keyError': 'min' });
    const arr = arrMax.concat(arrMin);
    if (size(arr) === 0) return [];
    return arr.map((item) => {
        if (item.keyError === 'max') return `${Case.sentence(item.key)} - ${item.keyError} must be: ${item.errValue.max}` 
        else return `${Case.sentence(item.key)} - ${item.keyError} must be: ${item.errValue.min}`
    });
}