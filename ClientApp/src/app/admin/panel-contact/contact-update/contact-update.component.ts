import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { isArray, isEmpty } from 'lodash';
import { ModalWarningComponent } from '../../../modal/modal-warning/modal-warning.component';
import { getValidationErrors, hasInvalidRequire, hasInvalidPattern, listInvalidLength } from '../../../utils/getValidationsForm';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  constructor(private dialogService: DialogService, private router: Router) { }
  
  contactForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(100)])
  });

  ngOnInit() {
    this.contactForm.setValue({
      fullName: 'Thu Nguyen',
      email: 'thuvosa@gmail.com',
      phone: '0999999999',
      address: '08 Nguyen Truong To - P.4 - Q.4'
    });
  }

  saveFunc() {
    const isValid = this.contactForm.valid;
    if (!isValid) {
      const errors = getValidationErrors(this.contactForm);
      const requiredField = hasInvalidRequire(errors);
      if (requiredField) {
        this.openDialog('Required fileds should not be empty. [ * is required field ]');
        return;
      }
      const listErr = listInvalidLength(errors);
      if (!isEmpty(listErr)) {
        this.openDialog(listErr);
        return;
      }
      if (hasInvalidPattern(errors)) {
        this.openDialog('Email is invalid format.');
        return;
      }
    } else {
      // this.tokenService.auth(this.loginForm.value).subscribe(token => {
      //   this.helpers.setToken(token);
      //   this.router.navigate(['adminpanel']);
      // });
    }
  }

  openDialog(msgErr: any) {
    this.dialogService.addDialog(ModalWarningComponent, {
      title: 'Validation Error',
      message: msgErr,
      isArray: isArray(msgErr)
    });
  }
}
