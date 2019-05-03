import { Component } from "@angular/core";
import { RegisterService } from "../core/register.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {

  constructor(private registerService: RegisterService) { }

  checkUsernameIsValid(form: NgForm) {
    this.registerService.checkUsernameIsValid(form);
  }
}
