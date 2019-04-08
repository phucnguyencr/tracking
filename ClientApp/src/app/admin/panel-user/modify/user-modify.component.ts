import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { isArray, isEmpty, isObject } from 'lodash';
import { ModalWarningComponent } from '../../../modal/modal-warning/modal-warning.component';
import { getValidationErrors, hasInvalidRequire, hasInvalidPattern, listInvalidLength } from '../../../utils/getValidationsForm';
import { DataService } from '../../public/data.service';
import { userUri } from '../../../admin/public/model';
import { UserService } from '../../../services/userService';
import { AppConfig } from '../../../config/config';

@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.css'],
  providers: [UserService, AppConfig]
})
export class UserModifyComponent implements OnInit {

  constructor(private dialogService: DialogService, private route: ActivatedRoute, 
    private router: Router, private dataService: DataService, private userService: UserService) { }
  id: string;
  userForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    userName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(50), 
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ]),
    active: new FormControl(true, [Validators.required])
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!isEmpty(this.id)) {
      this.userForm.controls['userName'].disable();
      let userData;
      this.dataService.currentMessage.subscribe(data => (userData = data));
      if (isObject(userData) && !isEmpty(userData)) {
        this.userForm.setValue({
          fullName: userData.fullName,
          userName: userData.userName,
          email: userData.email,
          active: userData.active
        });
      } else {
        this.router.navigate([`adminpanel/${userUri.root}`]);
      }
    }
  }

  saveFunc() {
    const isValid = this.userForm.valid;
    if (!isValid) {
      const errors = getValidationErrors(this.userForm);
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
      if (isEmpty(this.id)) {
        this.userService.createUsers(this.userForm.value).subscribe(token => {
          this.router.navigate([`adminpanel/${userUri.root}`]);
        });
      } else {
        this.userService.updateUsers(this.userForm.value, this.id).subscribe(token => {
          this.router.navigate([`adminpanel/${userUri.root}`]);
        });
      }
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
