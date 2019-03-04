import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { isArray, isEmpty, isObject } from 'lodash';
import { ModalWarningComponent } from '../../../modal/modal-warning/modal-warning.component';
import { getValidationErrors, hasInvalidRequire, listInvalidRange, listInvalidLength } from '../../../utils/getValidationsForm';
import { DataService } from '../../public/data.service';
import { flowUri } from '../../../admin/public/model';

@Component({
  selector: 'app-flow-modify',
  templateUrl: './flow-modify.component.html',
  styleUrls: ['./flow-modify.component.css']
})
export class FlowModifyComponent implements OnInit {

  constructor(private dialogService: DialogService, private route: ActivatedRoute, 
    private router: Router, private dataService: DataService) { }

  isCreated = false;
  id: string;
  flowForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    step: new FormControl(1, [Validators.required, Validators.max(10), Validators.min(1)]),
    subDescription: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isCreated = isEmpty(this.id);
    let flowData;
    this.dataService.currentMessage.subscribe(data => (flowData = data));
    if (isObject(flowData) && !isEmpty(flowData)) {
      this.flowForm.setValue({
        description: flowData.description,
        step: flowData.step,
        subDescription: flowData.subDescription,
      });
    } else {
      this.flowForm.setValue({
        description: '',
        step: 1,
        subDescription: ''
      });
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
      // this.tokenService.auth(this.loginForm.value).subscribe(token => {
      //   this.helpers.setToken(token);
      //   this.router.navigate(['adminpanel']);
      // });
      } else {
      // this.tokenService.auth(this.loginForm.value).subscribe(token => {
      //   this.helpers.setToken(token);
      //   this.router.navigate(['adminpanel']);
      // });
      }
      this.router.navigate([`adminpanel/${flowUri.root}`]);
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
