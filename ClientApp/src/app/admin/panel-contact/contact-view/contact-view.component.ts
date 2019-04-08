import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { size } from 'lodash';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { dataTable } from '../../public/model';
import { DataService } from '../../public/data.service';
import { contactUri } from '../../../admin/public/model';
import { ContactService } from '../../../services/contactService';
import { AppConfig } from '../../../config/config';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css'],
  providers: [ContactService, AppConfig]
})
export class ContactViewComponent implements OnInit {

  dataTable = dataTable;
  byStatus = true;
  constructor (private router: Router, private dataService: DataService, private contactService: ContactService, private calendar: NgbCalendar) {}
  
  contactForm = new FormGroup({
    fromDate: new FormControl({value: '', disabled: true }, [Validators.maxLength(10), Validators.required]),
    toDate: new FormControl({value: '', disabled: true }, [Validators.maxLength(10), Validators.required])
  });

  ngOnInit() {

  }

  checkFunc(strChecked) {
    if(strChecked) {
      this.byStatus = true;
      this.contactForm.controls['fromDate'].disable();
      this.contactForm.controls['toDate'].disable();
    } else {
      this.byStatus = false;
      this.contactForm.controls['fromDate'].enable();
      this.contactForm.controls['toDate'].enable();
    }
  }

  onSelect(contact) {
    this.router.navigate([`adminpanel/${contactUri.read}/${contact.id}`]);
    this.dataService.changeMessage(contact);
  }

  searchFunc() {
    this.contactService.getContact(this.contactForm.value, this.byStatus).subscribe(data => {
      this.dataTable.dataArr = data;
    });
    this.dataTable.headers = ['No.', 'Full Name', 'Company', 'Email', 'Phone', ''];
    this.dataTable.rowsNo = size(this.dataTable.dataArr);
  }
}
