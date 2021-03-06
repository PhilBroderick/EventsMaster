import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import * as $ from 'jquery';

@Injectable()
export class RegisterService {

  invalidUsername: boolean;

  constructor(private router: Router, private http: HttpClient) { }

  register(form: NgForm) {

    //check if passwords match, return if false
    if (form.value.password !== form.value.confirmPassword) {
      console.log("passwords don't match")
      return;
    } else {

      let credentials = JSON.stringify(form.value);

      this.http.post("https://eventsmasterapi.azurewebsites.net/auth/register", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe(response => {
        let token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidUsername = false;
      }, err => {
        $('input').css("border", "2px solid red");
        this.invalidUsername = true;
      });
    }
  }

  checkUsername(username: string) {
    
    let usernameJson = {
      "username": username
    }

    this.http.post("https://eventsmasterapi.azurewebsites.net/auth/checkusername", usernameJson, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      $('#username').css("border", "2px solid green");
    }, err => {
      $('#username').css("border", "2px solid red");
      this.invalidUsername = true;
    });
  }
}
