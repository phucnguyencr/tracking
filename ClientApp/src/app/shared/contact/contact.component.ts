import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contactService';
import { DialogService } from 'ng2-bootstrap-modal';
import { AppConfig } from '../../config/config';
import { isArray, isEmpty } from 'lodash'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getValidationErrors, hasInvalidRequire, hasInvalidPattern, listInvalidLength } from '../../utils/getValidationsForm';
import { ModalWarningComponent } from '../../modal/modal-warning/modal-warning.component';
import { ModalInfoComponent } from '../../modal/modal-info/modal-info.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService, AppConfig]
})
export class SharedContactComponent implements OnInit {
  private supportIMG = './assets/pics/support.png';
  constructor(private contactService: ContactService, private dialogService: DialogService) { }

  messageForm = new FormGroup({
    fullName: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
    company: new FormControl('', [ Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [ Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
    phone: new FormControl('', [ Validators.required, Validators.maxLength(20)]),
    message: new FormControl('', [ Validators.required, Validators.maxLength(200)])
  });

  ngOnInit() { }

  sendFunc() { 
    const isValid = this.messageForm.valid;
    if (!isValid) {
      const errors = getValidationErrors(this.messageForm);
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
      this.contactService.sendInfo(this.messageForm.value).subscribe(token => {
        this.resetValue();
        this.openDialog(true);
      });
    }
  }

  openDialog(msgErr: any) {
    if(msgErr === true) {
      this.dialogService.addDialog(ModalInfoComponent, {
        title: 'Information',
        message: 'Your message has been sent successfully.'
      }); 
    } else {
      this.dialogService.addDialog(ModalWarningComponent, {
        title: 'Validation Error',
        message: msgErr,
        isArray: isArray(msgErr)
      });
    }
  }

  resetValue() {
    this.messageForm.controls['fullName'].setValue('');
    this.messageForm.controls['company'].setValue('');
    this.messageForm.controls['email'].setValue('');
    this.messageForm.controls['phone'].setValue('');
    this.messageForm.controls['message'].setValue('');
  }
}
