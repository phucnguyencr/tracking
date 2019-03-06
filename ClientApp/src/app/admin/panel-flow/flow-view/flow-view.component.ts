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
        'name': 'Booked',
        'description': 'Booked',
        'subDescription': 'Booking received at $param1$, created by $param2$',
        'step': 1
      },
      {
        'id': '2',
        'name': 'Planned',
        'description': 'Expected Time of Departure',
        'subDescription': 'Planned for departure on vessel $param1$ with Voyage N° $param2$ on $param3$',
        'step': 2
      },
      {
        'id': '3',
        'name': 'Sailed',
        'description': 'Actual Time of Arrival',
        'subDescription': 'The vessel $param1$ with Voyage N° $param2$ sailed from $param3$ on $param4$',
        'step': 3
      },
      {
        'id': '4',
        'name': 'On The Way',
        'description': 'Expected Time of Arrival',
        'subDescription': '',
        'step': 4
      },
      {
        'id': '5',
        'name': 'Arrived',
        'description': 'Container Expected at Warehouse',
        'subDescription': '',
        'step': 5
      },
      {
        'id': '6',
        'name': 'Done',
        'description': 'Your shipment is now done',
        'subDescription': '',
        'step': 6
      }
    ];
    this.dataTable.headers = ['No.', 'Name', 'Description', 'Step', ''];
    this.dataTable.rowsNo = size(this.dataTable.dataArr);
  }

  onSelect(flow) {
    this.router.navigate([`adminpanel/${flowUri.modify}/${flow.id}`]);
    this.dataService.changeMessage(flow);
  }
}
