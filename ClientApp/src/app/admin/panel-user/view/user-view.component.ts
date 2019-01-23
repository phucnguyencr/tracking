import { Component, OnInit, Input } from '@angular/core';
import { navUri } from '../../public/model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  @Input() navObj: navUri;
  constructor() { }

  ngOnInit() {
    this.navObj.parentName = "User";
    this.navObj.parentUri = "/adminpanel/user";
    this.navObj.subName = "View";
  }
}
