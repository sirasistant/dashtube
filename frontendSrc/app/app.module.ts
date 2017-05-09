import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AlertModule } from 'ngx-bootstrap';
import { NgsRevealModule } from 'ng-scrollreveal';
import { ScrollSpyModule } from 'ng2-scrollspy';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LandingComponent } from './landing/landing.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { FileButtonComponent } from './views/fileButton.component';
import { DashPlayerComponent } from './views/dashPlayer.component';

import {UsersService} from './services/users.service';
import {VideosService} from './services/videos.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    FileButtonComponent,
    DashPlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgsRevealModule.forRoot(), 
    ScrollSpyModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },UsersService,VideosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
