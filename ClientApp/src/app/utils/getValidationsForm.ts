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
    const lengthErrors = filter(anyErrors,  { 'keyError': 'maxlength' });
    return lengthErrors.length > 0;
}

export function hasInvalidPattern(anyErrors) {
    const patternErrors = filter(anyErrors,  { 'keyError': 'pattern' });
    return patternErrors.length > 0;
}

export function listInvalidLength(anyErrors) {
    const arr = filter(anyErrors,  { 'keyError': 'maxlength' });
    if (size(arr) === 0) return [];
    return arr.map((item) => {
        return `${Case.sentence(item.key)} - Max length: ${item.errValue.requiredLength}`
    });
}