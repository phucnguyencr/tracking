import { Component, OnInit, ViewChild } from '@angular/core';
import { size } from 'lodash';
import { dataTable } from '../../public/model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  dataTable = dataTable;

  ngOnInit() {
    this.dataTable.dataArr = [
      {
          'id': '1',
          'firstName': 'Phuc',
          'lastName': 'Nguyen',
          'email': 'phucng@gmail.com',
          'password': 'abc',
          'isActive': true
      },
      {
          'id': '2',
          'firstName': 'An',
          'lastName': 'Nguyen',
          'email': 'anng@gmail.com',
          'password': 'abc',
          'isActive': false
      }
    ];
    this.dataTable.headers = ['No.', 'First Name', 'Last Name', 'Email', 'Status', ''];
    this.dataTable.rowsNo = size(this.dataTable.dataArr);
  }
}
