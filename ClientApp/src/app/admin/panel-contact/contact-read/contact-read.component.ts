import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { isEmpty, isObject } from 'lodash';
import { DataService } from '../../public/data.service';
import { contactUri } from '../../../admin/public/model';
import { ContactService } from '../../../services/contactService';
import { AppConfig } from '../../../config/config';

@Component({
  selector: 'app-contact-read',
  templateUrl: './contact-read.component.html',
  styleUrls: ['./contact-read.component.css'],
  providers: [ContactService, AppConfig]
})
export class ContactReadComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private router: Router, private dataService: DataService, private contactService: ContactService) { }

  messageForm = new FormGroup({
    fullName: new FormControl(),
    company: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    message: new FormControl()
  });

  searchInfo;
  isDisabled = true;
  isRead = false;


  ngOnInit() {
    this.dataService.currentMessage.subscribe(data => ( this.searchInfo = data ));
    if (isObject(this.searchInfo) && !isEmpty(this.searchInfo)) {
      const contactData = this.searchInfo.data;
      this.isRead = contactData.isRead;
      this.messageForm.setValue({
        fullName: contactData.fullName,
        company: contactData.company,
        email: contactData.email,
        phone: contactData.phone,
        message: contactData.message
      });
    } else {
      this.router.navigate([`adminpanel/${contactUri.root}`]);
    }
  }

  markFunc() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!isEmpty(id)) {
      this.contactService.markRead(id).subscribe(token => {
        this.router.navigate([`adminpanel/${contactUri.root}`]);
      });
    }
  }

  backFunc() {
    console.log(this.searchInfo);
    this.dataService.changeMessage(this.searchInfo);
    this.router.navigate([`adminpanel/${contactUri.root}`]);
  }
}
