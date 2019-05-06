import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { LoginService } from '../core/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
  
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  login(form: NgForm) {
    this.loginService.login(form);
    this.router.navigate(["/"]);
  }
}
