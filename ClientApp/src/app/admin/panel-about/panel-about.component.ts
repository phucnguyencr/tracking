import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel-about',
  templateUrl: './panel-about.component.html',
  styleUrls: ['./panel-about.component.css']
})
export class PanelAboutComponent implements OnInit {

  constructor() { }

  aboutForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(10)]),
    description: new FormControl('', [Validators.required])
  });

  ngOnInit() {
  }

}
