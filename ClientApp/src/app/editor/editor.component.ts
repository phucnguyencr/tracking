import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  private ckeditorContent: string;
  private ckConfig: object;

  constructor() { 
    this.ckeditorContent = '';
    this.ckConfig = {
      height: '250',
      extraPlugins: 'divarea',
      enterMode: '2',
      toolbar: [
        {name: 'clipboard', items: ['Undo', 'Redo']},
        {name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'NumberedList', 'BulletedList']},
        {name: 'insert', items: ['Image']},
        {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline']},
        {name: 'styles', items: ['Font', 'FontSize']},
        {name: 'colors', items: [ 'TextColor' ]},
      ]
    };
  }

  ngOnInit() {
  }

}
