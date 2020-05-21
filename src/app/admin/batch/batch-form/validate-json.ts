import { AbstractControl } from '@angular/forms';

export function ValidateJSON(control: AbstractControl) {
    const testString = control.value;
    try {
        JSON.parse(testString);
    } catch (e) {
        return { invalid: true };
    }
    return null;
}
