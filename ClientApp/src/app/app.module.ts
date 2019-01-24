import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';

import { SharedHomeComponent } from './shared/home/home.component';
import { SharedAboutComponent } from './shared/about/about.component';
import { SharedContactComponent } from './shared/contact/contact.component';
import { SharedHeaderComponent } from './shared/header/header.component';
import { SharedFooterComponent } from './shared/footer/footer.component';
import { SharedLayoutComponent } from './shared/layout/layout.component';

import { PanelHeaderComponent } from './admin/panel-header/panel-header.component';
import { PanelFooterComponent } from './admin/panel-footer/panel-footer.component';
import { PanelLayoutComponent } from './admin/panel-layout/panel-layout.component';
import { PanelLeftComponent } from './admin/panel-left/panel-left.component';
import { PanelTableComponent } from './admin/panel-table/panel-table.component';
import { PanelCardComponent } from './admin/panel-card/panel-card.component';
import { PanelDashboardComponent } from './admin/panel-dashboard/panel-dashboard.component';
import { UserViewComponent } from './admin/panel-user/view/user-view.component';
import { UserModifyComponent }  from './admin/panel-user/modify/user-modify.component';
import { PanelFlowComponent } from './admin/panel-flow/panel-flow.component';

@NgModule({
  declarations: [
    AppComponent,
    SharedHomeComponent,
    SharedAboutComponent,
    SharedContactComponent,
    SharedHeaderComponent,
    SharedFooterComponent,
    SharedLayoutComponent,
    LoginComponent,
    PanelHeaderComponent,
    PanelFooterComponent,
    PanelLayoutComponent,
    PanelLeftComponent,
    PanelCardComponent,
    PanelTableComponent,
    PanelDashboardComponent,
    UserViewComponent,
    UserModifyComponent,
    PanelFlowComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [PanelTableComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
