import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConfig } from '../../config/config';
import { ScheduleService } from '../../services/scheduleService';
import { DialogService } from 'ng2-bootstrap-modal';
import { ModalInfoComponent } from '../../modal/modal-info/modal-info.component';
import { ModalWarningComponent } from '../../modal/modal-warning/modal-warning.component';

@Component({
  selector: 'app-panel-schedule',
  templateUrl: './panel-schedule.component.html',
  styleUrls: ['./panel-schedule.component.css'],
  providers: [ScheduleService, AppConfig]
})
export class PanelScheduleComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  fileInfo = '';
  constructor(private scheduleService: ScheduleService, private dialogService: DialogService) { }

  ngOnInit() {
  }

  fileChange() {
    const fileBrowser = this.fileInput.nativeElement.value;
    this.fileInfo = fileBrowser.replace(/^.*[\\\/]/, '');
  }

  saveFunc() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const extension = this.fileInfo.split('.').pop();
      if (extension === 'xls' || extension === 'xlsx') {
        const formData = new FormData();
        formData.append('excel', fileBrowser.files[0]);
        this.scheduleService.uploadFile(formData).subscribe(result => {
          this.openDialog(result === null ? true : false);
        });
      }
    }
  }

  openDialog(isSuccess = false) {
    if (isSuccess) {
      this.dialogService.addDialog(ModalInfoComponent, {
        title: 'Information',
        message: 'File is uploaded successfully.'
      });
    } else {
      this.dialogService.addDialog(ModalWarningComponent, {
        title: 'Warning',
        message: 'Uploading is failed.'
      });
    }
  }
}
