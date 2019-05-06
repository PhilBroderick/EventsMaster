import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-header',
  templateUrl: './account.component.html'
})

export class AccountHeaderComponent {

  constructor(private router: Router) { }

  redirect() {
    this.router.navigate(['/login']);
  }
}
