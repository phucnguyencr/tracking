import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { isArray, isEmpty, isNil } from 'lodash';
import { ModalWarningComponent } from '../../../modal/modal-warning/modal-warning.component';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { getValidationErrors, hasInvalidRequire, listInvalidLength } from '../../../utils/getValidationsForm';
import { DataService } from '../../public/data.service';
import { userUri } from '../../../admin/public/model';

@Component({
  selector: 'app-ship-modify',
  templateUrl: './ship-modify.component.html',
  styleUrls: ['./ship-modify.component.css']
})
export class ShipModifyComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') public stepper;
  constructor(private dialogService: DialogService, private route: ActivatedRoute, 
    private router: Router, private dataService: DataService, private calendar: NgbCalendar, private cdr: ChangeDetectorRef) { }
  isDisabled = false;
  minDate = this.calendar.getToday();
  doneIdx = 0;
  stepArr = [];
  id: string;
  isClosed: false;
  shipForm = new FormGroup({
    billOfLading: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    voyageNo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    carton: new FormControl(0, [Validators.required, Validators.max(9999)]),
    weight: new FormControl(0, [Validators.required, Validators.max(9999)]),
    cubicMeter: new FormControl(0, [Validators.required, Validators.max(9999)]),
    origin: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    depShortName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    depVessel: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    depContainer: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    destination: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    destShortName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    actDepartureDate: new FormControl('', [Validators.required]),
    estArrivalDate: new FormControl('', [Validators.required]),
    estDischargeDate: new FormControl('', [Validators.required]),
    arrVessel: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    arrContainer: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    createdBy: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    bookingDate: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isDisabled = !isEmpty(this.id);
    let shipData;
    this.dataService.currentMessage.subscribe(data => (shipData = data));
    if (!isEmpty(shipData) && !isEmpty(this.id)) {
      this.shipForm.setValue({
        billOfLading: 'HHHLOZ00001',
        voyageNo: 'HPH0999',
        carton: 100,
        weight: 50.03,
        cubicMeter: 10.02,
        origin: 'Ha Noi',
        depShortName: 'HNI',
        actDepartureDate: this.setValueToDatePicker(),
        depVessel: 'C9990',
        depContainer: 'HC882',
        destination: 'Ho Chi Minh',
        destShortName: 'HCM',
        estArrivalDate: this.setValueToDatePicker('2019/03/02'),
        estDischargeDate: this.setValueToDatePicker('2019/03/05'),
        arrVessel: 'ZT201',
        arrContainer: 'ZC672',
        createdBy: 'Nguyen Thanh Lam',
        bookingDate: this.setValueToDatePicker('2019/02/14')
      });
      this.shipForm.controls['billOfLading'].disable();
      this.shipForm.controls['carton'].disable();
      this.shipForm.controls['weight'].disable();
      this.shipForm.controls['cubicMeter'].disable();
      this.shipForm.controls['createdBy'].disable();
      this.shipForm.controls['bookingDate'].disable();
    } 
    // this.stepArr = this.flowArr();
  }

  ngAfterViewInit() {
    this.doneIdx = 0;
    if (this.doneIdx > 0) {
      this.stepper.selectedIndex = this.doneIdx - 1;
      this.stepper.next();
    }
    this.cdr.detectChanges();  
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
    } else {
      // this.tokenService.auth(this.loginForm.value).subscribe(token => {
      //   this.helpers.setToken(token);
      //   this.router.navigate(['adminpanel']);
      // });
    }
  }

  closeFunc() {

  }
  
  openDialog(msgErr: any) {
    this.dialogService.addDialog(ModalWarningComponent, {
      title: 'Validation Error',
      message: msgErr,
      isArray: isArray(msgErr)
    });
  }

  setValueToDatePicker(dateStr = null) {
    if(isEmpty(dateStr)) return this.calendar.getToday();
    else { 
      const newDate = new Date(dateStr);
      return { year: newDate.getFullYear(), month: newDate.getMonth()+1, day: newDate.getDate() };
    }
  }

  changeStepEvent(doneStep) {
    this.doneIdx = doneStep;
  }

  flowArr () {
    return [
      {
        'name': 'Booked',
        'step': 1
      },
      {
        'name': 'Planned',
        'step': 2
      },
      {
        'name': 'Sailed',
        'step': 3
      },
      {
        'name': 'On The Way',
        'step': 4
      },
      {
        'name': 'Arrived',
        'step': 5
      },
      {
        'name': 'Done',
        'step': 6
      }
    ]
  }
}
