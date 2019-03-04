import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { size } from 'lodash';
import { dataTable } from '../../public/model';
import { DataService } from '../../public/data.service';
import { shipUri } from '../../../admin/public/model';

@Component({
  selector: 'app-ship-view',
  templateUrl: './ship-view.component.html',
  styleUrls: ['./ship-view.component.css']
})
export class ShipViewComponent implements OnInit {

  dataTable = dataTable;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataTable.dataArr = [
      {
        'id': '1',
        'billOfLading': 'HHHLZ00001',
        'cargo': '190 CARTONS - 1000 kgs - 50.02 cbm',
        'atcDeparture': '2019/08/02',
        'estArrival': '2019/08/03',
        'origin': 'Ha Noi',
        'destination': 'Ho Chi Minh'
      },
      {
        'id': '2',
        'billOfLading': 'HHHLZ00002',
        'cargo': '50 CARTONS - 200 kgs - 10.02 cbm',
        'atcDeparture': '2019/03/02',
        'estArrival': '2019/05/03',
        'origin': 'Hai Phong',
        'destination': 'Nha Trang'
      },
      {
        'id': '3',
        'billOfLading': 'HHHLZ00003',
        'cargo': '60 CARTONS - 100 kgs - 20.02 cbm',
        'atcDeparture': '2019/03/01',
        'estArrival': '2019/05/04',
        'origin': 'Mong Cai',
        'destination': 'Vung Tau'
      }
    ];
    this.dataTable.headers = ['No.', 'Bill Of Lading', 'Cargo', 'Origin', 'Atc. Departure', 'Destination', 'Est. Arrival', ''];
    this.dataTable.rowsNo = size(this.dataTable.dataArr);
  }

  onSelect(flow) {
    this.router.navigate([`adminpanel/${shipUri.modify}/${flow.id}`]);
    this.dataService.changeMessage(flow);
  }

}
