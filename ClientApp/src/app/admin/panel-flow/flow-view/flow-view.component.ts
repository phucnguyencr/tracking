import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { size, isEmpty } from 'lodash';
import { dataTable } from '../../public/model';
import { DataService } from '../../public/data.service';
import { flowUri } from '../../../admin/public/model';
import { FlowService } from '../../../services/flowService';
import { AppConfig } from '../../../config/config';

@Component({
  selector: 'app-flow-view',
  templateUrl: './flow-view.component.html',
  styleUrls: ['./flow-view.component.css'],
  providers: [AppConfig, FlowService]
})

export class FlowViewComponent implements OnInit {
  dataTable = dataTable;
  constructor(private router: Router, private dataService: DataService, private flowService: FlowService) { }

  ngOnInit() {
    this.flowService.getFlows().subscribe(data => {
      if(!isEmpty(data)) {
        this.dataTable.dataArr = data;
        this.dataTable.headers = ['No.', 'Name', 'Step No', ''];
        this.dataTable.rowsNo = size(this.dataTable.dataArr);
      } else {
        this.dataTable.dataArr = [];
        this.dataTable.headers = [];
        this.dataTable.rowsNo = 0;
      }
    });
  }

  onSelect(flow) {
    this.router.navigate([`adminpanel/${flowUri.modify}/${flow.id}`]);
    this.dataService.changeMessage(flow);
  }
}
