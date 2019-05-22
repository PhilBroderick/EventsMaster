import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatListModule, MatIconModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtHelper } from 'angular2-jwt';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { EventsComponent } from './events/event.component';
import { EventService } from './core/event.service';
import { AuthGuard } from './core/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { EventOverlayComponent } from './events/event-overlay.component';
import { EventOverlayService } from './core/event-overlay.service';
import { LoginService } from './core/login.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './core/register.service';
import { AccountHeaderComponent } from './account/account.component';
import { UploadService } from './core/image-upload.service';
import { NewEventComponent } from './events/new-event.component';
import { componentFactoryName } from '@angular/compiler';
import { EventDetailsComponent } from './events/event-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,
    EventsComponent,
    EventOverlayComponent,
    LoginComponent,
    RegisterComponent,
    NewEventComponent,
    AccountHeaderComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    OverlayModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: EventsComponent, pathMatch: 'full'},
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'createEvent', component: NewEventComponent, canActivate: [AuthGuard] },
      { path: 'eventDetails/:eventId', component: EventDetailsComponent}
    ])
  ],
  providers: [EventService, JwtHelper, AuthGuard, EventOverlayService, LoginService, RegisterService, UploadService],
  bootstrap: [AppComponent],
  entryComponents: [EventOverlayComponent]
})
export class AppModule { }
