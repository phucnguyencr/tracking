import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { isEmpty, isObject } from 'lodash';
import { DataService } from '../../public/data.service';
import { contactUri } from '../../../admin/public/model';

@Component({
  selector: 'app-contact-read',
  templateUrl: './contact-read.component.html',
  styleUrls: ['./contact-read.component.css']
})
export class ContactReadComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private router: Router, private dataService: DataService) { }

    messageForm = new FormGroup({
      fullName: new FormControl(),
      company: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      message: new FormControl()
    });
    isDisabled = true;

  ngOnInit() {
    let contactData;
    this.dataService.currentMessage.subscribe(data => (contactData = data));
    if (isObject(contactData) && !isEmpty(contactData)) {
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
      alert('OK');
      // this.tokenService.auth(this.loginForm.value).subscribe(token => {
      //   this.helpers.setToken(token);
      //   this.router.navigate(['adminpanel']);
      // });
    }
  }

}
