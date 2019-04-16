import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { size, isEmpty } from 'lodash';
import { dataTable } from '../../public/model';
import { DataService } from '../../public/data.service';
import { UserService } from '../../../services/userService';
import { userUri } from '../../../admin/public/model';
import { AppConfig } from '../../../config/config';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
  providers: [UserService, AppConfig]
})
export class UserViewComponent implements OnInit {
  dataTable = dataTable;

  constructor (private router: Router, private dataService: DataService, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      if(!isEmpty(data)) {
        this.dataTable.dataArr = data;
        this.dataTable.headers = ['No.', 'Full Name', 'User Name', 'Email', 'Status', ''];
        this.dataTable.rowsNo = size(this.dataTable.dataArr);
      } else {
        this.dataTable.dataArr = [];
        this.dataTable.headers = [];
        this.dataTable.rowsNo = 0;
      }
    });
  }
  
  onSelect(user) {
    this.router.navigate([`adminpanel/${userUri.modify}/${user.id}`]);
    this.dataService.changeMessage(user);
  }

  activeFunc(user, isActive) {
    user.active = isActive;
    this.userService.updateUsers(user, user.id).subscribe();
  }
}
