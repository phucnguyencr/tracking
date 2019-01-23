import { Component } from '@angular/core';
import { navUri } from '../public/model';
@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.css']
})
export class PanelLayoutComponent {
  navObj = navUri;
}
