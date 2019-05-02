import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  flowData = [];
  isLoading = false;
  isDischarged = false;
  isDelivery = false;
  constructor(private route: ActivatedRoute, private shipService: ShipmentService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.shipService.getInfo(this.id).subscribe(data => {
      if (!isEmpty(data.shipInfo)){
        this.shipData = data.shipInfo;
        this.flowData = data.flowInfo;
        this.isShow = true;
        const toDay = new Date();
        this.isLoading = toDay >= new Date(data.shipInfo.actDepartureDate);
        this.isDischarged = toDay >= new Date(data.shipInfo.estDischargeDate);
        this.isDelivery = toDay >= new Date(data.shipInfo.estArrivalDate);
      }
    });
  }
}
