import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel-schedule',
  templateUrl: './panel-schedule.component.html',
  styleUrls: ['./panel-schedule.component.css']
})
export class PanelScheduleComponent implements OnInit {
  fileInfo = '';
  constructor() { }

  uploadForm = new FormGroup({
    uploadFile: new FormControl('', [Validators.required])
  });

  ngOnInit() {
  }

  fileChange() {
    const filePath = this.uploadForm.controls['uploadFile'].value;
    this.fileInfo = filePath.replace(/^.*[\\\/]/, '');
  }

  saveFunc() {
    alert(JSON.stringify(this.uploadForm.value));
  }
}
