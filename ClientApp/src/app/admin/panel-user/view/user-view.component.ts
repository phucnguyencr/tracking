import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { size } from 'lodash';
import { dataTable } from '../../public/model';
import { DataService } from '../../public/data.service';
import { userUri } from '../../../admin/public/model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  dataTable = dataTable;

  constructor (private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.dataTable.dataArr = [
      {
          'id': '1',
          'fullName': 'Phuc Nguyen',
          'userName': 'pnguyen',
          'email': 'phucng@gmail.com',
          'isActive': true
      },
      {
          'id': '2',
          'fullName': 'An Nguyen',
          'userName': 'anguyen',
          'email': 'anng@gmail.com',
          'isActive': false
      }
    ];
    this.dataTable.headers = ['No.', 'Full Name', 'User Name', 'Email', 'Status', ''];
    this.dataTable.rowsNo = size(this.dataTable.dataArr);
  }
  
  onSelect(user) {
    this.router.navigate([`adminpanel/${userUri.modify}/${user.id}`]);
    this.dataService.changeMessage(user);
  }
}
