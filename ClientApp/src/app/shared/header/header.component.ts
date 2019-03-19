import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { AppConfig } from '../../config/config';
import { ScheduleService } from '../../services/scheduleService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ScheduleService, AppConfig]
})
export class SharedHeaderComponent implements OnInit {

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
  }

  downLoad() {
    this.scheduleService.downloadFile().subscribe(result => {
      this.saveToFile(result);
    });
  }

  saveToFile(data) {
    let blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    saveAs(blob, "vosaSchedule.xlsx");
  }
}
