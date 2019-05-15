import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { size, isEmpty, isObject, isArray, remove } from 'lodash';
import { dataTable } from '../../public/model';
import { DataService } from '../../public/data.service';
import { shipUri } from '../../../admin/public/model';
import { convertDateObjToString, compareDateObj } from '../../../utils/convertDateToString';
import { ShipmentService } from '../../../services/shipService';
import { AppConfig } from '../../../config/config';
import { DialogService } from 'ng2-bootstrap-modal';
import { ModalWarningComponent } from '../../../modal/modal-warning/modal-warning.component';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ship-view',
  templateUrl: './ship-view.component.html',
  styleUrls: ['./ship-view.component.css'],
  providers: [ShipmentService, AppConfig]
})
export class ShipViewComponent implements OnInit {

  dataTable = dataTable;
  constructor (private router: Router, private dataService: DataService, private shipService: ShipmentService,
    private calendar: NgbCalendar, private dialogService: DialogService) {}
  shipForm = new FormGroup({
    checker: new FormControl(0),
    billOfLading: new FormControl({value: '', disabled: false }, [Validators.maxLength(20)]),
    fromDate: new FormControl({value: '', disabled: true }, [Validators.maxLength(10)]),
    toDate: new FormControl({value: '', disabled: true }, [Validators.maxLength(10)])
  });

  ngOnInit() {
    this.dataTable.dataArr = [];
    this.dataTable.headers = [];
    this.dataTable.rowsNo = 0;
    let info;
    this.dataService.currentMessage.subscribe(data => (
      info = data
    ));
    if (isObject(info) && !isEmpty(info.searchValue)) {
      this.shipForm.setValue({
        checker: info.searchBy,
        billOfLading: info.searchValue.billOfLading || '',
        fromDate: info.searchValue.fromDate || '',
        toDate: info.searchValue.toDate || ''
      });
      this.checkFunc();
      this.searchFunc();
    } else {
      this.checkFunc();
    }
  }

  onSelect(ship) {
    this.router.navigate([`adminpanel/${shipUri.modify}/${ship.id}`]);
    this.dataService.changeMessage({
      data: ship,
      searchBy: this.shipForm.value.checker,
      searchValue: {
        fromDate : this.shipForm.value.fromDate,
        toDate: this.shipForm.value.toDate,
        billOfLading: this.shipForm.value.billOfLading
      }
    });
  }

  checkFunc() {
    const opt = this.shipForm.value.checker;
    if (opt === 0) {
      this.resetDateValue();
      this.resetBillValue();
      this.shipForm.controls['billOfLading'].disable();
      this.shipForm.controls['fromDate'].disable();
      this.shipForm.controls['toDate'].disable();
    } else if (opt === 1) {
      this.resetDateValue();
      this.shipForm.controls['billOfLading'].enable();
      this.shipForm.controls['fromDate'].disable();
      this.shipForm.controls['toDate'].disable();
    } else {
      this.resetBillValue();
      this.shipForm.controls['billOfLading'].disable();
      this.shipForm.controls['fromDate'].enable();
      this.shipForm.controls['toDate'].enable();
    }
  }

  resetDateValue() {
    this.shipForm.controls['fromDate'].setValue('');
    this.shipForm.controls['toDate'].setValue('');
  }

  resetBillValue() {
    this.shipForm.controls['billOfLading'].setValue('');
  }

  searchFunc() {
    if (!compareDateObj(this.shipForm.value.fromDate, this.shipForm.value.toDate)) {
      this.openDialog('From Date should be less than To Date');
      return;
    }
    const fromDate = this.shipForm.value.checker === 0 ? '' : convertDateObjToString(this.shipForm.value.fromDate);
    const toDate = this.shipForm.value.checker === 0 ? '' : convertDateObjToString(this.shipForm.value.toDate);
    const billNo = this.shipForm.value.billOfLading;
    this.shipService.getList(fromDate, toDate, billNo, this.shipForm.value.checker).subscribe(data => {
      this.dataTable.dataArr = data;
      this.dataTable.headers = ['No.', 'Bill Of Lading', 'Origin', 'Atc. Departure', 'Destination', 'Est. Arrival', ''];
      this.dataTable.rowsNo = size(data);
    });
  }

  onDelete(ship) {
    this.shipService.removeInfo(ship.id).subscribe(data => {
      remove(this.dataTable.dataArr, { id: ship.id });
      this.dataTable.rowsNo = size(this.dataTable.dataArr);
    });
  }

  openDialog(msgErr: any) {
    this.dialogService.addDialog(ModalWarningComponent, {
      title: 'Validation Error',
      message: msgErr,
      isArray: isArray(msgErr)
    });
  }
}
