import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConfig } from '../../config/config';
import { ScheduleService } from '../../services/scheduleService';

@Component({
  selector: 'app-panel-schedule',
  templateUrl: './panel-schedule.component.html',
  styleUrls: ['./panel-schedule.component.css'],
  providers: [ScheduleService, AppConfig]
})
export class PanelScheduleComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  fileInfo = '';
  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
  }

  fileChange() {
    const fileBrowser = this.fileInput.nativeElement.value;
    this.fileInfo = fileBrowser.replace(/^.*[\\\/]/, '');
  }

  saveFunc() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", fileBrowser.files[0]);
      this.scheduleService.uploadFile(formData).subscribe(result => {
        alert(result);
      });
    }
  }
}
