import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})

export class ModalInfoComponent extends DialogComponent<Object, boolean> {
  title: string;
  message: any;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
}
