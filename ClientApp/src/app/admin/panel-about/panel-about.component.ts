import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { isArray, isEmpty } from 'lodash';
import { CkeditorConfigService } from '../../config/ckEditorconfig';
import { ModalWarningComponent } from '../../modal/modal-warning/modal-warning.component';
import { getValidationErrors, hasInvalidRequire, listInvalidLength } from '../../utils/getValidationsForm';

@Component({
  selector: 'app-panel-about',
  templateUrl: './panel-about.component.html',
  styleUrls: ['./panel-about.component.css'],
  providers: [CkeditorConfigService]
})
export class PanelAboutComponent implements OnInit {

  constructor(private dialogService: DialogService, private router: Router, private ckConfig: CkeditorConfigService) { }
  config = {};
  aboutForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]),
    description: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.aboutForm.setValue({
      title: 'About Us',
      description: 'Test OK.'
    });
    this.config = this.ckConfig.getConfig();
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
      // this.tokenService.auth(this.loginForm.value).subscribe(token => {
      //   this.helpers.setToken(token);
      //   this.router.navigate(['adminpanel']);
      // });
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
