import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipmentService } from '../../services/shipService';
import { AppConfig } from '../../config/config';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
  providers: [ShipmentService, AppConfig]
})
export class SharedTrackingComponent implements OnInit {
  id = '';
  isShow = false;
  shipData = {};
  errString = 'No any data found ! Please contact us for further info.';
  constructor(private route: ActivatedRoute, private shipService: ShipmentService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.shipService.getInfo(this.id).subscribe(data => {
      if (!isEmpty(data.shipData)){
        this.shipData = data;
        this.isShow = true;
      }
    });
  }

}
