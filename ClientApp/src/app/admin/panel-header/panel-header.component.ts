import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ModalConfirmComponent } from '../../modal/modal-confirm/modal-confirm.component';
import { Helpers } from '../../helpers/helpers'

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.css']
})
export class PanelHeaderComponent {

  constructor(private dialogService: DialogService, private helpers: Helpers, private router: Router) {}

  showConfirm() {
    this.dialogService.addDialog(ModalConfirmComponent, {
      title: 'Ready To Leave',
      message: 'Select "Logout" below if you are ready to end your current session.',
      buttonTitle: 'Log out'
    })
    .subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.helpers.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
