import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { size, isArray, isEmpty, isObject } from 'lodash';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { dataTable } from '../../public/model';
import { DataService } from '../../public/data.service';
import { contactUri } from '../../../admin/public/model';
import { ContactService } from '../../../services/contactService';
import { AppConfig } from '../../../config/config';
import { DialogService } from 'ng2-bootstrap-modal';
import { ModalWarningComponent } from '../../../modal/modal-warning/modal-warning.component';
import { convertDateObjToString, compareDateObj } from '../../../utils/convertDateToString';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css'],
  providers: [ContactService, AppConfig]
})
export class ContactViewComponent implements OnInit {

  dataTable = dataTable;
  constructor (private router: Router, private dataService: DataService, private contactService: ContactService,
    private calendar: NgbCalendar, private dialogService: DialogService) {}

  contactForm = new FormGroup({
    checker: new FormControl(0),
    fromDate: new FormControl({value: '', disabled: true }, [Validators.maxLength(10), Validators.required]),
    toDate: new FormControl({value: '', disabled: true }, [Validators.maxLength(10), Validators.required])
  });

  ngOnInit() {
    let info;
    this.dataTable.dataArr = [];
    this.dataTable.headers = [];
    this.dataTable.rowsNo = 0;
    this.dataService.currentMessage.subscribe(data => (
      info = data
    ));
    if (!isEmpty(info) && isObject(info)) {
      this.contactForm.setValue({
        checker: info.searchBy === 'Status' ? 0 : 1,
        fromDate: info.searchValue.fromDate || '',
        toDate: info.searchValue.toDate || ''
      });
      this.checkFunc(info.searchBy === 'Status' ? true : false);
      this.searchFunc();
    }
  }

  checkFunc(strChecked) {
    if (strChecked) {
      this.contactForm.controls['fromDate'].setValue('');
      this.contactForm.controls['toDate'].setValue('');
      this.contactForm.controls['fromDate'].disable();
      this.contactForm.controls['toDate'].disable();
    } else {
      this.contactForm.controls['fromDate'].enable();
      this.contactForm.controls['toDate'].enable();
    }
  }

  onSelect(contact) {
    this.router.navigate([`adminpanel/${contactUri.read}/${contact.id}`]);
    this.dataService.changeMessage({
      data: contact,
      searchBy: this.contactForm.value.checker === 0 ? 'Status' : 'CreatedDate',
      searchValue: {
        fromDate : this.contactForm.value.fromDate,
        toDate: this.contactForm.value.toDate
      }
    });
  }

  searchFunc() {
    if (!compareDateObj(this.contactForm.value.fromDate, this.contactForm.value.toDate)) {
      this.openDialog('From Date should be less than To Date');
      return;
    }
    const fromDate = this.contactForm.value.checker === 0 ? '' : convertDateObjToString(this.contactForm.value.fromDate);
    const toDate = this.contactForm.value.checker === 0 ? '' : convertDateObjToString(this.contactForm.value.toDate);
    this.contactService.getContact(fromDate, toDate, this.contactForm.value.checker).subscribe(data => {
      this.dataTable.dataArr = data;
      this.dataTable.headers = ['No.', 'Full Name', 'Company', 'Email', 'Phone', ''];
      this.dataTable.rowsNo = size(data);
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
