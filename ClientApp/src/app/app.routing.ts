import { Routes, RouterModule } from '@angular/router';
import { userUri } from './admin/public/model';

import { LoginComponent } from './login/login.component';

import { SharedLayoutComponent } from './shared/layout/layout.component';
import { SharedHomeComponent }  from './shared/home/home.component';
import { SharedAboutComponent }  from './shared/about/about.component';
import { SharedContactComponent } from './shared/contact/contact.component';

import { PanelLayoutComponent } from './admin/panel-layout/panel-layout.component';
import { PanelDashboardComponent }  from './admin/panel-dashboard/panel-dashboard.component';
import { UserViewComponent }  from './admin/panel-user/view/user-view.component';
import { UserModifyComponent }  from './admin/panel-user/modify/user-modify.component';
import { PanelFlowComponent }  from './admin/panel-flow/panel-flow.component';

const appRoutes: Routes =[
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
            { path: userUri.root, component: UserViewComponent },
            { path: `${userUri.modify}`, component: UserModifyComponent },
            { path: `${userUri.modify}/:id`, component: UserModifyComponent },
            { path: 'flow', component: PanelFlowComponent }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);