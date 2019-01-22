import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedHomeComponent } from './shared/home/home.component';
import { SharedAboutComponent } from './shared/about/about.component';
import { SharedContactComponent } from './shared/contact/contact.component';
import { SharedHeaderComponent } from './shared/header/header.component';
import { SharedFooterComponent } from './shared/footer/footer.component';
import { SharedLayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    SharedHomeComponent,
    SharedAboutComponent,
    SharedContactComponent,
    SharedHeaderComponent,
    SharedFooterComponent,
    SharedLayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
