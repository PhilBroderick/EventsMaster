import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../core/register.service";
import { NgForm } from "@angular/forms";
import * as $ from 'jquery';
import { Router } from "@angular/router";
import { LoginService } from "../core/login.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {

  passwordEntered = false;

  constructor(private registerService: RegisterService, private router: Router, public loginService: LoginService) { }
  
  register(form: NgForm) {
    this.registerService.register(form);
    this.loginService.isLoggedIn = true;
    this.router.navigate(['/']);
  }

  checkUserNameIsValid(username: string) {
    this.registerService.checkUsername(username);
  }

  onPasswordChange(password: string) {
    if (password.length >= 1) {
      this.passwordEntered = true;
    } else {
      this.passwordEntered = false;
    }
  }

  onConfirmPasswordChange(password: string) {
    let originalPassword = $('#password').val();
    let $confirmPasswordInput = $('#confirmPassword');
    
    if (password !== originalPassword) {
      $confirmPasswordInput.css("border", "2px solid red");
      $('#register').prop('disabled', true);
    } else {
      $confirmPasswordInput.css("border", "");
      $('#register').prop('disabled', false);
    }
  }
  
}
