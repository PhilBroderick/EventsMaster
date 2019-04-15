import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatListModule, MatIconModule, MatButtonModule } from '@angular/material';

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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,
    EventsComponent,
    EventOverlayComponent,
    LoginComponent
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
    RouterModule.forRoot([
      { path: '', component: EventsComponent, pathMatch: 'full'},
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [EventService, JwtHelper, AuthGuard, EventOverlayService],
  bootstrap: [AppComponent],
  entryComponents: [EventOverlayComponent]
})
export class AppModule { }
