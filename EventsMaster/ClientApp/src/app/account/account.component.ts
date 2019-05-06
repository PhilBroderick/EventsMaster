import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../core/login.service';

@Component({
  selector: 'app-account-header',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountHeaderComponent {

  constructor(private router: Router, public loginService: LoginService) { }
  
  logout() {
    this.loginService.logout();
  }

}
