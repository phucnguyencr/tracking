import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contactService';
import { AppConfig } from '../../../config/config';
import { DialogService } from 'ng2-bootstrap-modal';
import { isArray, isEmpty } from 'lodash';
import { ModalWarningComponent } from '../../../modal/modal-warning/modal-warning.component';
import { getValidationErrors, hasInvalidRequire, hasInvalidPattern, listInvalidLength } from '../../../utils/getValidationsForm';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css'],
  providers: [ContactService, AppConfig]
})
export class ContactUpdateComponent implements OnInit {

  constructor(private dialogService: DialogService, private router: Router, private contactService: ContactService) { }

  contactForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(200)])
  });

  ngOnInit() {
    this.contactService.getInfo().subscribe(data => {
      if(!isEmpty(data)) {
        this.contactForm.setValue({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address
        });
      }
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
      this.contactService.updateInfo(this.contactForm.value).subscribe(token => {
        this.router.navigate(['adminpanel']);
      });
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
