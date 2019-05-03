import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";


@Injectable()
export class RegisterService {

  invalidUsername: boolean;

  constructor(private router: Router, private http: HttpClient) { }

  checkUsernameIsValid(form: NgForm) {

    let username = JSON.stringify(form.value);

    this.http.post("https://eventsmasterapi.azurewebsites.net/auth/checkusername", username, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      console.log("success")
      }, err => {
        console.log("error")
        this.invalidUsername = true;
    });
  }
}
