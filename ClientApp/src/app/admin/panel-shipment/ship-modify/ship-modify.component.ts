import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { isArray, isEmpty, isObject } from 'lodash';
import { ModalWarningComponent } from '../../../modal/modal-warning/modal-warning.component';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { getValidationErrors, hasInvalidRequire, listInvalidLength } from '../../../utils/getValidationsForm';
import { convertDateToObject} from '../../../utils/convertDateToString';
import { DataService } from '../../public/data.service';
import { shipUri } from '../../../admin/public/model';
import { ShipmentService } from '../../../services/shipService';
import { AppConfig } from '../../../config/config';

@Component({
  selector: 'app-ship-modify',
  templateUrl: './ship-modify.component.html',
  styleUrls: ['./ship-modify.component.css'],
  providers: [ShipmentService, AppConfig]
})
export class ShipModifyComponent implements OnInit {
  constructor(private dialogService: DialogService, private route: ActivatedRoute, 
    private router: Router, private dataService: DataService, private calendar: NgbCalendar, private shipService: ShipmentService) { }
  isCreated = false;
  doneIdx = 0;
  id: string;
  isClosed: false;
  searchInfo;
  shipForm = new FormGroup({
    billOfLading: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    voyageNo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    carton: new FormControl(0, [Validators.required, Validators.max(9999)]),
    weight: new FormControl(0, [Validators.required, Validators.max(9999)]),
    cubicMeter: new FormControl(0, [Validators.required, Validators.max(9999)]),
    origin: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    depShortName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    depVessel: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    depContainer: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    destination: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    destShortName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    actDepartureDate: new FormControl('', [Validators.required]),
    estArrivalDate: new FormControl('', [Validators.required]),
    estDischargeDate: new FormControl('', [Validators.required]),
    arrVessel: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    arrContainer: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    createdBy: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    bookedDate: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isCreated = isEmpty(this.id);
    if(this.isCreated) {
      this.shipForm.setValue({
        billOfLading: '',
        voyageNo: '',
        carton: 0,
        weight: 0,
        cubicMeter: 0,
        origin: '',
        depShortName: '',
        actDepartureDate: this.calendar.getToday(),
        depVessel: '',
        depContainer: '',
        destination: '',
        destShortName: '',
        estArrivalDate: this.calendar.getToday(),
        estDischargeDate: this.calendar.getToday(),
        arrVessel: '',
        arrContainer: '',
        createdBy: '',
        bookedDate: this.calendar.getToday()
      });
    } else {
      this.dataService.currentMessage.subscribe(data => (this.searchInfo = data));
      const shipData = this.searchInfo.data;
      if (isObject(this.searchInfo) && !isEmpty(this.searchInfo)) {
        this.shipForm.setValue({
          billOfLading: shipData.billOfLading,
          voyageNo: shipData.voyageNo,
          carton: shipData.carton,
          weight: shipData.weight,
          cubicMeter: shipData.cubicMeter,
          origin: shipData.origin,
          depShortName: shipData.depShortName,
          actDepartureDate: convertDateToObject(shipData.actDepartureDate),
          depVessel: shipData.depVessel,
          depContainer: shipData.depContainer,
          destination: shipData.destination,
          destShortName: shipData.depShortName,
          estArrivalDate: convertDateToObject(shipData.estArrivalDate),
          estDischargeDate: convertDateToObject(shipData.estDischargeDate),
          arrVessel: shipData.arrVessel,
          arrContainer: shipData.arrContainer,
          createdBy: shipData.createdBy,
          bookedDate: convertDateToObject(shipData.bookedDate)
        });
        this.isClosed = shipData.isClosed;
        this.shipForm.controls['billOfLading'].disable();
        this.shipForm.controls['carton'].disable();
        this.shipForm.controls['weight'].disable();
        this.shipForm.controls['cubicMeter'].disable();
        this.shipForm.controls['createdBy'].disable();
        this.shipForm.controls['bookedDate'].disable();
        if(this.isClosed) {
          this.shipForm.controls['voyageNo'].disable();
          this.shipForm.controls['origin'].disable();
          this.shipForm.controls['depShortName'].disable();
          this.shipForm.controls['depVessel'].disable();
          this.shipForm.controls['depContainer'].disable();
          this.shipForm.controls['actDepartureDate'].disable();
          this.shipForm.controls['destination'].disable();
          this.shipForm.controls['destShortName'].disable();
          this.shipForm.controls['estDischargeDate'].disable();
          this.shipForm.controls['arrVessel'].disable();
          this.shipForm.controls['arrContainer'].disable();
          this.shipForm.controls['estArrivalDate'].disable();
        }
      } else {
        this.router.navigate([`adminpanel/${shipUri.root}`]);
      }
    }
  }

  saveFunc() {
    const isValid = this.shipForm.valid;
    if (!isValid) {
      const errors = getValidationErrors(this.shipForm);
      const requiredField = hasInvalidRequire(errors);
      if (requiredField) {
        this.openDialog('Required fileds should not be empty. [ * is required field ]');
        return;
      }
      const listErr = listInvalidLength(errors);
      if (!isEmpty(listErr)) {
        this.openDialog(listErr);
        return;
      }
    } else {
      if(this.isCreated) {
        this.shipService.createInfo(this.shipForm.value).subscribe(token => {
          this.router.navigate([`adminpanel/${shipUri.root}`]);
        });
      } else {
        this.shipService.updateInfo(this.shipForm.getRawValue(), this.id).subscribe(token => {
          this.router.navigate([`adminpanel/${shipUri.root}`]);
        });
      }
    }
  }

  closeFunc() {
    this.shipService.closeInfo(this.id).subscribe(token => {
      this.router.navigate([`adminpanel/${shipUri.root}`]);
    });
  }

  backFunc() {
    this.router.navigate([`adminpanel/${shipUri.root}`]);
  }
  
  openDialog(msgErr: any) {
    this.dialogService.addDialog(ModalWarningComponent, {
      title: 'Validation Error',
      message: msgErr,
      isArray: isArray(msgErr)
    });
  }
}
