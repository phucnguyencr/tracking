import { Component, OnInit } from '@angular/core';
import { userUri, contactUri, aboutUri, scheduleUri, flowUri, shipUri } from '../public/model';

@Component({
  selector: 'app-panel-left',
  templateUrl: './panel-left.component.html',
  styleUrls: ['./panel-left.component.css']
})
export class PanelLeftComponent implements OnInit {
  public userUri = userUri;
  public contactUri = contactUri;
  public aboutUri = aboutUri;
  public scheduleUri = scheduleUri;
  public flowUri = flowUri;
  public shipUri = shipUri;
  
  constructor() { }

  ngOnInit() {

  }
}
