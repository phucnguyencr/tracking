import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../services/aboutService';
import { AppConfig } from '../../config/config';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [AboutService, AppConfig]
})
export class SharedAboutComponent implements OnInit {
  private supportIMG = './assets/pics/support.png';
  private skypeIMG = './assets/pics/skype.png';
  constructor(private aboutService: AboutService) { }
  title = '';
  description = '';
  ngOnInit() {
    this.aboutService.getInfo().subscribe(data => {
      if (!isEmpty(data)){
        this.title = data.title;
        this.description = data.description;
      }
    });
  }

}
