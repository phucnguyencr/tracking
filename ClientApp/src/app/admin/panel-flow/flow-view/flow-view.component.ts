import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { size } from 'lodash';
import { dataTable } from '../../public/model';
import { DataService } from '../../public/data.service';
import { flowUri } from '../../../admin/public/model';

@Component({
  selector: 'app-flow-view',
  templateUrl: './flow-view.component.html',
  styleUrls: ['./flow-view.component.css']
})

export class FlowViewComponent implements OnInit {
  dataTable = dataTable;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataTable.dataArr = [
      {
        'id': '1',
        'description': 'Booked',
        'subDescription': 'Booking received at $param1$, created by $param2$',
        'step': 1
      },
      {
        'id': '2',
        'description': 'Expected Time of Departure',
        'subDescription': 'Booking received at $param1$, created by $param2$',
        'step': 2
      },
      {
        'id': '3',
        'description': 'Actual Time of Departure',
        'subDescription': 'Planned for departure on vessel $param1$ with Voyage N° $param2$ on $param3$',
        'step': 3
      },
      {
        'id': '4',
        'description': 'Expected Time of Arrival',
        'subDescription': 'The vessel $param1$ with Voyage N° $param2$ sailed from $param3$ on $param4$',
        'step': 4
      },
      {
        'id': '5',
        'description': 'Actual Time of Arrival',
        'subDescription': '',
        'step': 5
      }
    ];
    this.dataTable.headers = ['No.', 'Description', 'Step', ''];
    this.dataTable.rowsNo = size(this.dataTable.dataArr);
  }

  onSelect(flow) {
    this.router.navigate([`adminpanel/${flowUri.modify}/${flow.id}`]);
    this.dataService.changeMessage(flow);
  }
}
