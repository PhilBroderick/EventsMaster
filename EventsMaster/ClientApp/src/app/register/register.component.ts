import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../core/register.service";
import { NgForm } from "@angular/forms";
import * as $ from 'jquery';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {

  constructor(private registerService: RegisterService) { }
  
  register(form: NgForm) {
    this.registerService.register(form);
  }

  checkUserNameIsValid(username: string) {
    this.registerService.checkUsername(username);
  }
  
}
