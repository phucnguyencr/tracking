import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.css']
})
export class ModalWarningComponent extends DialogComponent<Object, boolean> {
  title: string;
  message: any;
  isArray: boolean;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }
}
