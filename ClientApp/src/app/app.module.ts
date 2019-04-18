import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AuthGuard } from './helpers/activateAuthGuard';
import { Helpers } from './helpers/helpers';
import { DataService } from './admin/public/data.service';
import { CKEditorModule } from 'ng2-ckeditor';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';

import { SharedHomeComponent } from './shared/home/home.component';
import { SharedAboutComponent } from './shared/about/about.component';
import { SharedContactComponent } from './shared/contact/contact.component';
import { SharedHeaderComponent } from './shared/header/header.component';
import { SharedFooterComponent } from './shared/footer/footer.component';
import { SharedLayoutComponent } from './shared/layout/layout.component';
import { SharedTrackingComponent } from './shared/tracking/tracking.component';

import { PanelHeaderComponent } from './admin/panel-header/panel-header.component';
import { PanelFooterComponent } from './admin/panel-footer/panel-footer.component';
import { PanelLayoutComponent } from './admin/panel-layout/panel-layout.component';
import { PanelLeftComponent } from './admin/panel-left/panel-left.component';
import { PanelCardComponent } from './admin/panel-card/panel-card.component';
import { PanelDashboardComponent } from './admin/panel-dashboard/panel-dashboard.component';
import { UserViewComponent } from './admin/panel-user/view/user-view.component';
import { UserModifyComponent } from './admin/panel-user/modify/user-modify.component';
import { UserResetComponent } from './admin/panel-user/reset/user-reset.component';
import { ModalConfirmComponent } from './modal/modal-confirm/modal-confirm.component';
import { ModalWarningComponent } from './modal/modal-warning/modal-warning.component';
import { ModalInfoComponent } from './modal/modal-info/modal-info.component';
import { ModalResetPassComponent } from './modal/modal-reset-pass/modal-reset-pass.component';
import { ContactViewComponent } from './admin/panel-contact/contact-view/contact-view.component';
import { ContactReadComponent } from './admin/panel-contact/contact-read/contact-read.component';
import { ContactUpdateComponent } from './admin/panel-contact/contact-update/contact-update.component';
import { PanelAboutComponent } from './admin/panel-about/panel-about.component';
import { PanelScheduleComponent } from './admin/panel-schedule/panel-schedule.component';
import { FlowViewComponent } from './admin/panel-flow/flow-view/flow-view.component';
import { FlowModifyComponent } from './admin/panel-flow/flow-modify/flow-modify.component';
import { ShipViewComponent } from './admin/panel-shipment/ship-view/ship-view.component';
import { ShipModifyComponent } from './admin/panel-shipment/ship-modify/ship-modify.component';

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
    PanelDashboardComponent,
    UserViewComponent,
    UserModifyComponent,
    UserResetComponent,
    ModalConfirmComponent,
    ModalWarningComponent,
    ModalInfoComponent,
    ModalResetPassComponent,
    ContactViewComponent,
    ContactReadComponent,
    ContactUpdateComponent,
    PanelAboutComponent,
    PanelScheduleComponent,
    FlowViewComponent,
    FlowModifyComponent,
    ShipViewComponent,
    ShipModifyComponent,
    SharedTrackingComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    routing,
    CKEditorModule,
    NgbModule,
    MatStepperModule,
    MatIconModule,
    BootstrapModalModule.forRoot({container: document.body})
  ],
  entryComponents: [
    ModalConfirmComponent,
    ModalWarningComponent,
    ModalInfoComponent,
    ModalResetPassComponent
  ],
  providers: [AuthGuard, Helpers, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
