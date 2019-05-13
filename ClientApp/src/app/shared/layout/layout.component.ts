import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class SharedLayoutComponent implements OnInit {
  private homeIMG = './assets/pics/homepage.jpg';
  constructor() { }

  ngOnInit() {
  }

}
