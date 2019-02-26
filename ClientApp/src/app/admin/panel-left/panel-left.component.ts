import { Component, OnInit } from '@angular/core';
import { userUri, contactUri, aboutUri } from '../public/model';

@Component({
  selector: 'app-panel-left',
  templateUrl: './panel-left.component.html',
  styleUrls: ['./panel-left.component.css']
})
export class PanelLeftComponent implements OnInit {
  public userUri = userUri;
  public contactUri = contactUri;
  public aboutUri = aboutUri;
  
  constructor() { }

  ngOnInit() {

  }
}
