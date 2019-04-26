import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { isArray, isEmpty, isObject } from 'lodash';
import { ModalWarningComponent } from '../../../modal/modal-warning/modal-warning.component';
import { getValidationErrors, hasInvalidRequire, listInvalidRange, listInvalidLength } from '../../../utils/getValidationsForm';
import { DataService } from '../../public/data.service';
import { flowUri } from '../../../admin/public/model';
import { FlowService } from '../../../services/flowService';
import { AppConfig } from '../../../config/config';

@Component({
  selector: 'app-flow-modify',
  templateUrl: './flow-modify.component.html',
  styleUrls: ['./flow-modify.component.css'],
  providers: [FlowService, AppConfig]
})
export class FlowModifyComponent implements OnInit {

  constructor(private dialogService: DialogService, private route: ActivatedRoute, 
    private router: Router, private dataService: DataService, private flowService: FlowService) { }

  isCreated = false;
  id: string;
  flowForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    stepNo: new FormControl({ value: 1, disabled: true }, [Validators.required, Validators.max(10), Validators.min(1)]),
    description: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]),
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isCreated = isEmpty(this.id);
    if (this.isCreated) {
      this.flowForm.setValue({
        name: '',
        stepNo: 1,
        description: '',
      });
    } else {
      let flowData;
      this.dataService.currentMessage.subscribe(data => (flowData = data));
      if (isObject(flowData) && !isEmpty(flowData)) {
        this.flowForm.setValue({
          name: flowData.name,
          stepNo: flowData.stepNo,
          description: flowData.description,
        });
      } else {
        this.router.navigate([`adminpanel/${flowUri.root}`]);
      }
    }
  }

  saveFunc() {
    const isValid = this.flowForm.valid;
    if (!isValid) {
      const errors = getValidationErrors(this.flowForm);
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
      const listRangeErr = listInvalidRange(errors);
      if (!isEmpty(listRangeErr)) {
        this.openDialog(listRangeErr);
        return;
      }
    } else {
      if(this.isCreated) {
        this.flowService.createFlow(this.flowForm.value).subscribe(token => {
          this.router.navigate([`adminpanel/${flowUri.root}`]);
        });
      } else {
        this.flowService.updateFlow(this.flowForm.value, this.id).subscribe(token => {
          this.router.navigate([`adminpanel/${flowUri.root}`]);
        });
      }
    }
  }

  openDialog(msgErr: any) {
    this.dialogService.addDialog(ModalWarningComponent, {
      title: 'Validation Error',
      message: msgErr,
      isArray: isArray(msgErr)
    });
  }
}
