import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { isArray, isEmpty } from 'lodash';
import { AboutService } from '../../services/aboutService';
import { AppConfig } from '../../config/config';
import { CkeditorConfigService } from '../../config/ckEditorconfig';
import { ModalWarningComponent } from '../../modal/modal-warning/modal-warning.component';
import { getValidationErrors, hasInvalidRequire, listInvalidLength } from '../../utils/getValidationsForm';

@Component({
  selector: 'app-panel-about',
  templateUrl: './panel-about.component.html',
  styleUrls: ['./panel-about.component.css'],
  providers: [CkeditorConfigService, AboutService, AppConfig]
})
export class PanelAboutComponent implements OnInit {

  constructor(private dialogService: DialogService, private router: Router, 
    private ckConfig: CkeditorConfigService, private aboutService: AboutService) { }
  config = {};
  aboutForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]),
    description: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.config = this.ckConfig.getConfig();
    this.aboutService.getInfo().subscribe(data => {
      if (!isEmpty(data)){
        this.aboutForm.setValue({
          title: data.title,
          description: data.description
        });
      }
    });
  }

  saveFunc() {
    const isValid = this.aboutForm.valid;
    if (!isValid) {
      const errors = getValidationErrors(this.aboutForm);
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
      this.aboutService.updateInfo(this.aboutForm.value).subscribe(token => {
        this.router.navigate(['adminpanel']);
      });
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
