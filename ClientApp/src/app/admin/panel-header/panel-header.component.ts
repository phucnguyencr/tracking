import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { isEmpty } from 'lodash';
import { TokenService } from '../../services/tokenService';
import { AppConfig } from '../../config/config';
import { ModalConfirmComponent } from '../../modal/modal-confirm/modal-confirm.component';
import { ModalResetPassComponent } from '../../modal/modal-reset-pass/modal-reset-pass.component';
import { Helpers } from '../../helpers/helpers'

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.css'],
  providers: [TokenService, AppConfig]
})
export class PanelHeaderComponent {

  constructor(private dialogService: DialogService, private helpers: Helpers, 
    private router: Router, private authService: TokenService) {}

  showConfirm() {
    this.dialogService.addDialog(ModalConfirmComponent, {
      title: 'Ready To Leave',
      message: 'Click "Logout" if you are ready to end your current session.',
      buttonTitle: 'Log out'
    })
    .subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.helpers.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  showChange() {
    this.dialogService.addDialog(ModalResetPassComponent)
    .subscribe((result) => {
      if (!isEmpty(result)) {
        this.authService.changePassword(result).subscribe(res => {
          this.helpers.logout();
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
