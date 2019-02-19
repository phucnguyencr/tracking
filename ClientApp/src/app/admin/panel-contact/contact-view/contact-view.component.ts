import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { size } from 'lodash';
import { dataTable } from '../../public/model';
import { DataService } from '../../public/data.service';
import { contactUri } from '../../../admin/public/model';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {

  dataTable = dataTable;

  constructor (private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.dataTable.dataArr = [
      {
          'id': '1',
          'fullName': 'Phuc Nguyen',
          'company': 'pnguyen',
          'email': 'phucng@gmail.com',
          'phone': '099099999',
          'message': 'hjhafkhdf bashfsDHFKSh hhasdfaHFKASHDKFH HDHkdhakhdlas'
      },
      {
          'id': '2',
          'fullName': 'An Nguyen',
          'company': 'anguyen',
          'email': 'anng@gmail.com',
          'phone': '099099999',
          'message': 'hjhafkhdf bashfsDHFKSh hhasdfaHFKASHDKFH HDHkdhakhdlas'
      }
    ];
    this.dataTable.headers = ['No.', 'Full Name', 'Company', 'Email', 'Phone', ''];
    this.dataTable.rowsNo = size(this.dataTable.dataArr);
  }

  onSelect(contact) {
    this.router.navigate([`adminpanel/${contactUri.read}/${contact.id}`]);
    this.dataService.changeMessage(contact);
  }
}
