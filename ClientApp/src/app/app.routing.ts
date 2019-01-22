import { Routes, RouterModule } from '@angular/router';

import { SharedLayoutComponent } from './shared/layout/layout.component';
import { SharedHomeComponent }  from './shared/home/home.component';
import { SharedAboutComponent }  from './shared/about/about.component';
import { SharedContactComponent } from './shared/contact/contact.component';

import { LayoutComponent } from './admin/layout/layout.component';
import { UserComponent }  from './admin/user/user.component';
import { FlowComponent }  from './admin/flow/flow.component';

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
        component: LayoutComponent,
        children: [
            { path: 'user', component: UserComponent },
            { path: 'flow', component: FlowComponent }
        ]
    }
];

export const routing = RouterModule.forRoot(appRoutes);