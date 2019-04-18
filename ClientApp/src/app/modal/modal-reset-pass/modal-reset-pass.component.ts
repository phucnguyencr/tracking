import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { getValidationErrors, hasInvalidRequire, listInvalidLength } from '../../utils/getValidationsForm';
import { isEmpty, isEqual } from 'lodash';

@Component({
  selector: 'modal-reset-pass',
  templateUrl: './modal-reset-pass.component.html',
  styleUrls: ['./modal-reset-pass.component.css']
})
export class ModalResetPassComponent extends DialogComponent<Object, boolean> {
  errString = '';
  isShow = false;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  changeForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
  });

  confirm() {
    const isValid = this.changeForm.valid;
    if (!isValid) {
      const errors = getValidationErrors(this.changeForm);
      const requiredField = hasInvalidRequire(errors);
      this.isShow = true;
      if (requiredField) {
        this.errString = 'Required fileds should not be empty. [ * is required field ]';
        return;
      }
      const listErr = listInvalidLength(errors);
      if (!isEmpty(listErr)) {
        this.errString = listErr;
        return;
      }
    } 
    if (!isEqual(this.changeForm.value.password, this.changeForm.value.confirmPassword)) {
      this.isShow = true;
      this.errString = 'Confirm Password is incorrect';
      return;
    }
    this.result = this.changeForm.value;
    this.close();
  }

  changeFunc() {
    this.errString = '';
    this.isShow = false;
  }
}
