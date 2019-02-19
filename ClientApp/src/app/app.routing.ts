import { Routes, RouterModule } from '@angular/router';
import { userUri, contactUri } from './admin/public/model';
import { AuthGuard } from './helpers/activateAuthGuard';

import { LoginComponent } from './login/login.component';
import { SharedLayoutComponent } from './shared/layout/layout.component';
import { SharedHomeComponent } from './shared/home/home.component';
import { SharedAboutComponent } from './shared/about/about.component';
import { SharedContactComponent } from './shared/contact/contact.component';

import { PanelLayoutComponent } from './admin/panel-layout/panel-layout.component';
import { PanelDashboardComponent } from './admin/panel-dashboard/panel-dashboard.component';
import { UserViewComponent } from './admin/panel-user/view/user-view.component';
import { UserModifyComponent } from './admin/panel-user/modify/user-modify.component';
import { UserResetComponent } from './admin/panel-user/reset/user-reset.component';
import { PanelFlowComponent } from './admin/panel-flow/panel-flow.component';
import { ContactViewComponent } from './admin/panel-contact/contact-view/contact-view.component';
import { ContactReadComponent } from './admin/panel-contact/contact-read/contact-read.component';
import { ContactLandingComponent } from './admin/panel-contact/contact-landing/contact-landing.component';
import { ContactUpdateComponent } from './admin/panel-contact/contact-update/contact-update.component';

const appRoutes: Routes = [
    {
        path: '',
        component: SharedLayoutComponent,
        children: [
            { path: '', component: SharedHomeComponent, pathMatch: 'full'},
            { path: 'home', component: SharedHomeComponent },
            { path: 'about', component: SharedAboutComponent },
            { path: 'contact', component: SharedContactComponent }
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
            { path: contactUri.landing, component: ContactLandingComponent, canActivate: [AuthGuard] },
            { path: `${contactUri.read}/:id`, component: ContactReadComponent, canActivate: [AuthGuard] },
            { path: contactUri.update, component: ContactUpdateComponent, canActivate: [AuthGuard] },
            { path: 'flow', component: PanelFlowComponent, canActivate: [AuthGuard] }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);
