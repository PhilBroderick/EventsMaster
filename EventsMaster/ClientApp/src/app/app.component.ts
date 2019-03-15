import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>
      Events
    </h1>
    <div class="header-bar"></div>
    <app-events></app-events>
  `
})
export class AppComponent {
  title = 'app';
}
