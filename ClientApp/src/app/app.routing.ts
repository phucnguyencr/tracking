import { Routes, RouterModule } from '@angular/router';
import { userUri, contactUri, aboutUri, scheduleUri, flowUri, shipUri } from './admin/public/model';
import { AuthGuard } from './helpers/activateAuthGuard';

import { LoginComponent } from './login/login.component';
import { SharedLayoutComponent } from './shared/layout/layout.component';
import { SharedHomeComponent } from './shared/home/home.component';
import { SharedAboutComponent } from './shared/about/about.component';
import { SharedContactComponent } from './shared/contact/contact.component';
import { SharedTrackingComponent } from './shared/tracking/tracking.component';

import { PanelLayoutComponent } from './admin/panel-layout/panel-layout.component';
import { PanelDashboardComponent } from './admin/panel-dashboard/panel-dashboard.component';
import { UserViewComponent } from './admin/panel-user/view/user-view.component';
import { UserModifyComponent } from './admin/panel-user/modify/user-modify.component';
import { UserResetComponent } from './admin/panel-user/reset/user-reset.component';
import { ContactViewComponent } from './admin/panel-contact/contact-view/contact-view.component';
import { ContactReadComponent } from './admin/panel-contact/contact-read/contact-read.component';
import { ContactUpdateComponent } from './admin/panel-contact/contact-update/contact-update.component';
import { PanelAboutComponent } from './admin/panel-about/panel-about.component';
import { PanelScheduleComponent } from './admin/panel-schedule/panel-schedule.component';
import { FlowViewComponent } from './admin/panel-flow/flow-view/flow-view.component';
import { FlowModifyComponent } from './admin/panel-flow/flow-modify/flow-modify.component';
import { ShipViewComponent } from './admin/panel-shipment/ship-view/ship-view.component';
import { ShipModifyComponent } from './admin/panel-shipment/ship-modify/ship-modify.component';

const appRoutes: Routes = [
    {
        path: '',
        component: SharedLayoutComponent,
        children: [
            { path: '', component: SharedHomeComponent, pathMatch: 'full'},
            { path: 'home', component: SharedHomeComponent },
            { path: aboutUri.root, component: SharedAboutComponent },
            { path: 'contact', component: SharedContactComponent },
            { path: 'tracking/:id', component: SharedTrackingComponent },
        ]
    },
    {
        path: 'adminpanel',
        component: PanelLayoutComponent,
        children: [
            { path: '', component: PanelDashboardComponent, pathMatch: 'full' },
            { path: userUri.root, component: UserViewComponent, canActivate: [AuthGuard] },
            { path: `${userUri.modify}`, component: UserModifyComponent, canActivate: [AuthGuard] },
            { path: `${userUri.modify}/:id`, component: UserModifyComponent, canActivate: [AuthGuard] },
            { path: `${userUri.resetPass}`, component: UserResetComponent, canActivate: [AuthGuard] },
            { path: contactUri.root, component: ContactViewComponent, canActivate: [AuthGuard] },
            { path: `${contactUri.read}/:id`, component: ContactReadComponent, canActivate: [AuthGuard] },
            { path: contactUri.update, component: ContactUpdateComponent, canActivate: [AuthGuard] },
            { path: aboutUri.update, component: PanelAboutComponent, canActivate: [AuthGuard] },
            { path: scheduleUri.root, component: PanelScheduleComponent, canActivate: [AuthGuard] },
            { path: flowUri.root, component: FlowViewComponent, canActivate: [AuthGuard] },
            { path: `${flowUri.modify}`, component: FlowModifyComponent, canActivate: [AuthGuard] },
            { path: `${flowUri.modify}/:id`, component: FlowModifyComponent, canActivate: [AuthGuard] },
            { path: shipUri.root, component: ShipViewComponent, canActivate: [AuthGuard] },
            { path: `${shipUri.modify}`, component: ShipModifyComponent, canActivate: [AuthGuard] },
            { path: `${shipUri.modify}/:id`, component: ShipModifyComponent, canActivate: [AuthGuard] },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);
