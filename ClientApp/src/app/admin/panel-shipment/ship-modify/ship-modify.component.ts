import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { isArray, isEmpty, isObject } from 'lodash';
import { ModalWarningComponent } from '../../../modal/modal-warning/modal-warning.component';
import { getValidationErrors, hasInvalidRequire, hasInvalidPattern, listInvalidLength } from '../../../utils/getValidationsForm';
import { DataService } from '../../public/data.service';
import { userUri } from '../../../admin/public/model';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ship-modify',
  templateUrl: './ship-modify.component.html',
  styleUrls: ['./ship-modify.component.css']
})
export class ShipModifyComponent implements OnInit {

  constructor(private dialogService: DialogService, private route: ActivatedRoute, 
    private router: Router, private dataService: DataService, private calendar: NgbCalendar) { }
  isCreated = false;
  isDisabled = true;
  id: string;
  shipForm = new FormGroup({
    billOfLading: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    voyageNo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    carton: new FormControl(0, [Validators.required, Validators.max(9999)]),
    weight: new FormControl(0, [Validators.required, Validators.max(9999)]),
    cubicMeter: new FormControl(0, [Validators.required, Validators.max(9999)]),
    origin: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    actDeparture: new FormControl('', [Validators.required]),
    depVessel: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    depContainer: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    destination: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    estArrival: new FormControl('', [Validators.required]),
    arVessel: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    arContainer: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    status: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isCreated = isEmpty(this.id);
    this.isDisabled = !this.isCreated;
    let userData;
    this.dataService.currentMessage.subscribe(data => (userData = data));
    if (isObject(userData) && !isEmpty(userData)) {
      this.shipForm.setValue({
        fullName: userData.fullName,
        userName: userData.userName,
        email: userData.email,
        isActive: userData.isActive
      });
    } 
  }

  saveFunc() {
    const isValid = this.shipForm.valid;
    if (!isValid) {
      const errors = getValidationErrors(this.shipForm);
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

  selectToday() {
    this.shipForm['actDeparture'].setValue = this.calendar.getToday();
  }

}
