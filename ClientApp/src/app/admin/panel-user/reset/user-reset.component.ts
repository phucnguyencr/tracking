import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { userUri } from '../../../admin/public/model';
import { UserService } from '../../../services/userService';
import { AppConfig } from '../../../config/config';
import { ModalWarningComponent } from '../../../modal/modal-warning/modal-warning.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { isArray, isEmpty, isEqual } from 'lodash';
import { getValidationErrors, hasInvalidRequire, listInvalidLength } from '../../../utils/getValidationsForm';

@Component({
  selector: 'app-user-reset',
  templateUrl: './user-reset.component.html',
  styleUrls: ['./user-reset.component.css'],
  providers: [UserService, AppConfig]
})
export class UserResetComponent implements OnInit {
  userList = [];
  constructor(private router: Router, private userService: UserService, private dialogService: DialogService) { }
  
  resetForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
  });

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    });
  }

  saveFunc() {
    const isValid = this.resetForm.valid;
    if (!isValid) {
      const errors = getValidationErrors(this.resetForm);
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
    } else {
      if (!isEqual(this.resetForm.value.password, this.resetForm.value.confirmPassword)) {
        this.openDialog('Confirm Password is incorrect');
        return;
      }
      this.userService.resetUsers(this.resetForm.value).subscribe(token => {
        this.router.navigate([`adminpanel/${userUri.root}`]);
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
