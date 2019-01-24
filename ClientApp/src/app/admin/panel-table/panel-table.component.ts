import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-table',
  templateUrl: './panel-table.component.html',
  styleUrls: ['./panel-table.component.css']
})
export class PanelTableComponent implements OnInit {
  dataArr: Array<object> = [];
  headers: Array<string> = [];
  rowsNo: number = 0;
  constructor() { }

  ngOnInit() {
    
  }
}
